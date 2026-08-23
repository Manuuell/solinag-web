from PIL import Image

icon = Image.open("assets/img/logo-icon.png").convert("RGBA")
size = 180
canvas = Image.new("RGBA", (size, size), (255, 255, 255, 255))
scale = (size * 0.72) / max(icon.size)
resized = icon.resize((int(icon.width * scale), int(icon.height * scale)), Image.LANCZOS)
pos = ((size - resized.width) // 2, (size - resized.height) // 2)
canvas.paste(resized, pos, resized)
canvas.convert("RGB").save("assets/img/apple-touch-icon.png")
print("saved", canvas.size)
