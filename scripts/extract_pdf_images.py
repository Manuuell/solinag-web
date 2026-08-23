import pymupdf
import os

os.makedirs("scripts/_extracted", exist_ok=True)

for pdfname in ["Solinag.pdf", "MANUAL DE IDENTIDAD CORPORATIVA.pdf"]:
    doc = pymupdf.open(f"brand/{pdfname}")
    tag = "sol" if "Solinag" in pdfname else "manual"
    for pno in range(len(doc)):
        page = doc[pno]
        imgs = page.get_images(full=True)
        for i, img in enumerate(imgs):
            xref = img[0]
            try:
                base = doc.extract_image(xref)
            except Exception as e:
                print("skip", xref, e)
                continue
            ext = base["ext"]
            w, h = base["width"], base["height"]
            data = base["image"]
            fname = f"scripts/_extracted/{tag}_p{pno+1}_x{xref}_{w}x{h}.{ext}"
            with open(fname, "wb") as f:
                f.write(data)
    print(pdfname, "done")
