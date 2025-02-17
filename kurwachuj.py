import torch
import warnings
import numpy as np
from whisper.audio import log_mel_spectrogram, pad_or_trim
from whisper.tokenizer import get_tokenizer, LANGUAGES
from whisper.utils import format_timestamp, get_end
from whisper.decoding import DecodingOptions, DecodingResult
import tqdm

def transcribe(model, audio, verbose=False, **decode_options):
    dtype = torch.float16 if decode_options.get("fp16", True) else torch.float32
    if model.device == torch.device("cpu"):
        if torch.cuda.is_available():
            warnings.warn("Performing inference on CPU when CUDA is available")
        dtype = torch.float32

    mel = log_mel_spectrogram(audio, model.dims.n_mels, padding=32000)
    content_frames = mel.shape[-1] - 300
    content_duration = float(content_frames * 160 / 16000)

    if decode_options.get("language", None) is None:
        if not model.is_multilingual:
            decode_options["language"] = "pl"
        else:
            mel_segment = pad_or_trim(mel, 300).to(model.device).to(dtype)
            _, probs = model.detect_language(mel_segment)
            decode_options["language"] = max(probs, key=probs.get)

    language = decode_options["language"]
    tokenizer = get_tokenizer(model.is_multilingual, num_languages=model.num_languages, language=language)

    def decode_with_fallback(segment):
        temperatures = [0.0, 0.2, 0.4, 0.6, 0.8, 1.0]
        for t in temperatures:
            options = DecodingOptions(**decode_options, temperature=t)
            result = model.decode(segment, options)
            if result.compression_ratio < 2.4 and result.avg_logprob > -1.0:
                return result
        return result

    all_tokens = []
    all_segments = []
    seek = 0

    with tqdm.tqdm(total=content_frames, unit="frames", disable=verbose is not False) as pbar:
        while seek < content_frames:
            mel_segment = mel[:, seek:seek + 300]
            mel_segment = pad_or_trim(mel_segment, 300).to(model.device).to(dtype)

            result = decode_with_fallback(mel_segment)
            tokens = torch.tensor(result.tokens)

            duration = (tokens[tokens >= tokenizer.timestamp_begin].max().item() - tokenizer.timestamp_begin) * 0.02 if tokens[tokens >= tokenizer.timestamp_begin].size(0) else 0.02
            segment = {
                "seek": seek,
                "start": seek * 0.02,
                "end": seek * 0.02 + duration,
                "text": tokenizer.decode(tokens.tolist()),
                "tokens": tokens.tolist()
            }
            
            all_segments.append(segment)
            all_tokens.extend(tokens.tolist())
            seek += 300
            pbar.update(300)

    return {"text": tokenizer.decode(all_tokens), "segments": all_segments, "language": language}