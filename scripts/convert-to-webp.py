import os
import re
import codecs
from PIL import Image

def convert_image_to_webp(image_path):
    """
    Converts the image at image_path to WebP, deletes the original image,
    and returns the new file path.
    """
    base, ext = os.path.splitext(image_path)
    new_path = base + ".webp"
    try:
        with Image.open(image_path) as im:
            im.save(new_path, "webp")
        print(f"Converted {image_path} to {new_path}")
        # Delete the original image file
        os.remove(image_path)
        print(f"Deleted original image: {image_path}")
    except Exception as e:
        print(f"Failed to convert {image_path}: {e}")
        return None
    return new_path

def process_markdown_file(md_file):
    """
    Finds image references in the Markdown file, converts eligible images,
    updates the Markdown reference, and deletes the original image.
    Handles paths with escaped Unicode sequences.
    """
    with open(md_file, "r", encoding="utf-8") as f:
        content = f.read()

    # Regex pattern to match markdown image syntax: ![alt](path)
    pattern = r'!\[(.*?)\]\((.*?)\)'

    def replace_match(match):
        alt_text = match.group(1)
        raw_path = match.group(2)

        # Decode escaped unicode sequences if present (e.g. "\350\277\220")
        try:
            decoded_path = codecs.decode(raw_path, 'unicode_escape')
        except Exception as e:
            decoded_path = raw_path

        # Process only JPG, JPEG, or PNG files
        if decoded_path.lower().endswith((".jpg", ".jpeg", ".png")):
            md_dir = os.path.dirname(md_file)
            full_image_path = os.path.join(md_dir, decoded_path)
            if os.path.exists(full_image_path):
                new_image_file = convert_image_to_webp(full_image_path)
                if new_image_file:
                    base, _ = os.path.splitext(decoded_path)
                    new_relative_path = base + ".webp"
                    # Use the proper Unicode path in the markdown reference
                    return f'![{alt_text}]({new_relative_path})'
                else:
                    return match.group(0)
            else:
                print(f"Image not found: {full_image_path}")
                return match.group(0)
        return match.group(0)

    new_content = re.sub(pattern, replace_match, content)

    with open(md_file, "w", encoding="utf-8") as f:
        f.write(new_content)
    print(f"Updated markdown file: {md_file}")

def process_all_markdowns(root_dir):
    for dirpath, _, filenames in os.walk(root_dir):
        for filename in filenames:
            if filename.lower().endswith(".md"):
                md_file = os.path.join(dirpath, filename)
                process_markdown_file(md_file)

if __name__ == "__main__":
    # Set the path to your Hexo blog root directory
    blog_root = "source/_posts"
    process_all_markdowns(blog_root)
