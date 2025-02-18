from openai import OpenAI
client = OpenAI()

response = client.images.generate(
    model="dall-e-3",
    prompt=
    """Stwórz mroczny, cyberpunkowy krajobraz cyfrowy z dominującymi ciemnymi tonami – głęboka czerń, odcienie niebieskiego i fioletu. Tło wypełnione jest abstrakcyjnymi elementami technologicznymi, takimi jak spływające linie kodu, sekwencje binarne oraz delikatne wzory obwodów elektronicznych. Całość utrzymana w tajemniczej, nieco mglistej atmosferze z neonowymi akcentami, które podkreślają klimat cyberprzestępczości i hackingu, jednocześnie zachowując minimalistyczny i elegancki wygląd.""",
    size="1024x1024",
    quality="hd",
    n=1,
)

print(response.data[0].url)