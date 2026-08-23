from PIL import Image

def crop_save(src, box, dst):
    im = Image.open(src).convert("RGB")
    im.crop(box).save(dst)
    print(dst, im.crop(box).size)

base = "scripts/_extracted/"
out = "assets/img/"

# Compactadora SOL-MTC-15 -- isolate the machine render on white
crop_save(base + "sol_p2_x61_575x1280.jpeg", (0, 240, 575, 800), out + "prod-compactadora.jpg")

# Bicitriciclo SOL-BT-M01 -- isolate the vehicle render on white
crop_save(base + "sol_p2_x63_575x1280.jpeg", (6, 266, 570, 726), out + "prod-bicitriciclo.jpg")

# Línea de reciclaje PET -- isolate the machine render (crop out top banner + bottom text)
crop_save(base + "sol_p2_x62_575x1280.jpeg", (0, 248, 575, 610), out + "prod-linea-pet.jpg")

# Ingeniero SOLINAG en planta -- keep the photo + caption chip, drop the white text panel below
crop_save(base + "sol_p2_x64_575x1280.jpeg", (0, 0, 575, 650), out + "prod-ingeniero.jpg")

# Fachada + equipo SOLINAG (real team photo)
crop_save(base + "sol_p3_x103_399x212.jpeg", (0, 0, 399, 212), out + "team-solinag.jpg")
