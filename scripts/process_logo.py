from PIL import Image
import numpy as np

im = Image.open("logo.jpeg").convert("RGB")
arr = np.array(im).astype(int)

# Chroma key near-white background -> transparent
bg = np.array([247, 247, 247])
dist = np.sqrt(((arr - bg) ** 2).sum(axis=2))
alpha = np.clip((dist - 8) * 12, 0, 255).astype("uint8")

rgba = np.dstack([arr.astype("uint8"), alpha])
out = Image.fromarray(rgba, "RGBA")

# Crop to content bounding box (with small padding)
bbox = out.getbbox()
pad = 20
l, t, r, b = bbox
l = max(0, l - pad); t = max(0, t - pad)
r = min(out.width, r + pad); b = min(out.height, b + pad)
cropped = out.crop((l, t, r, b))
cropped.save("assets/img/logo-full.png")
print("full", cropped.size)

# Icon only: the mark sits in the top ~62% of the cropped image (above wordmark)
w, h = cropped.size
icon = cropped.crop((0, 0, w, int(h * 0.60)))
ibbox = icon.getbbox()
icon = icon.crop(ibbox)
icon.save("assets/img/logo-icon.png")
print("icon", icon.size)

# Square favicon canvas (padded, centered) at 512
size = 512
canvas = Image.new("RGBA", (size, size), (0, 0, 0, 0))
iw, ih = icon.size
scale = (size * 0.82) / max(iw, ih)
icon_r = icon.resize((int(iw * scale), int(ih * scale)), Image.LANCZOS)
cx = (size - icon_r.width) // 2
cy = (size - icon_r.height) // 2
canvas.paste(icon_r, (cx, cy), icon_r)
canvas.save("assets/img/favicon-512.png")
print("favicon", canvas.size)
