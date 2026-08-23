from PIL import Image
import numpy as np
from scipy import ndimage

im = Image.open("scripts/_manual_p4.png").convert("RGB")
arr = np.array(im)
mask = (arr[:, :, 0] < 40) & (arr[:, :, 1] < 40) & (arr[:, :, 2] < 40)
lbl, n = ndimage.label(mask)
sizes = ndimage.sum(mask, lbl, range(1, n + 1))
biggest = np.argmax(sizes) + 1
ys, xs = np.where(lbl == biggest)
box = (xs.min(), ys.min(), xs.max(), ys.max())
print(box)
crop = im.crop(box)
crop.save("scripts/_dark_crop2.png")
print(crop.size)

# Make black transparent -> rounded dark badge will be added via CSS instead;
# export as RGBA with black -> transparent for flexible placement
rgba = crop.convert("RGBA")
data = np.array(rgba)
blackish = (data[:, :, 0] < 25) & (data[:, :, 1] < 25) & (data[:, :, 2] < 25)
data[blackish, 3] = 0
Image.fromarray(data).save("assets/img/logo-dark-bg.png")
print("saved transparent version")
