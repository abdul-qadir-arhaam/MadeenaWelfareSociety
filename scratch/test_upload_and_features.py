import urllib.request
import json
import uuid

# 1. Login to get session cookie
login_url = "http://localhost:3000/api/admin/login"
login_payload = json.dumps({"username": "admin", "password": "admin"}).encode("utf-8")
req = urllib.request.Request(login_url, data=login_payload, headers={"Content-Type": "application/json"})
with urllib.request.urlopen(req) as resp:
    cookies = resp.getheader("Set-Cookie")
    auth_header = {"Cookie": cookies.split(";")[0]}
    print("Login successful! Cookie obtained.")

# 2. Upload multiple mock image files
boundary = f"----WebKitFormBoundary{uuid.uuid4().hex}"
body = []

# File 1
body.append(f"--{boundary}".encode("utf-8"))
body.append(b'Content-Disposition: form-data; name="files"; filename="system_photo_1.jpg"')
body.append(b"Content-Type: image/jpeg\r\n")
body.append(b"\xFF\xD8\xFF\xE0\x00\x10JFIF\x00\x01\x01\x01\x00`\x00`\x00\x00\xFF\xDB\x00C\x00\x08\x06\x06\x07\x06\x05\x08\x07\x07\x07\t\t\x08\n\x0c\x14\r\x0c\x0b\x0b\x0c\x19\x12\x13\x0f\x14\x1d\x1a\x1f\x1e\x1d\x1a\x1c\x1c $.' \",#\x1c\x1c(7),01444\x1f'9=82<.342\xFF\xC0\x00\x0b\x08\x00\x01\x00\x01\x01\x01\x11\x00\xFF\xC4\x00\x1f\x00\x00\x01\x05\x01\x01\x01\x01\x01\x01\x00\x00\x00\x00\x00\x00\x00\x00\x01\x02\x03\x04\x05\x06\x07\x08\t\n\x0b\xFF\xDA\x00\x08\x01\x01\x00\x00?\x00\xbf\x00\xFF\xD9")
body.append(b"")

# File 2
body.append(f"--{boundary}".encode("utf-8"))
body.append(b'Content-Disposition: form-data; name="files"; filename="system_cover_photo.jpg"')
body.append(b"Content-Type: image/jpeg\r\n")
body.append(b"\xFF\xD8\xFF\xE0\x00\x10JFIF\x00\x01\x01\x01\x00`\x00`\x00\x00\xFF\xDB\x00C\x00\x08\x06\x06\x07\x06\x05\x08\x07\x07\x07\t\t\x08\n\x0c\x14\r\x0c\x0b\x0b\x0c\x19\x12\x13\x0f\x14\x1d\x1a\x1f\x1e\x1d\x1a\x1c\x1c $.' \",#\x1c\x1c(7),01444\x1f'9=82<.342\xFF\xC0\x00\x0b\x08\x00\x01\x00\x01\x01\x01\x11\x00\xFF\xC4\x00\x1f\x00\x00\x01\x05\x01\x01\x01\x01\x01\x01\x00\x00\x00\x00\x00\x00\x00\x00\x01\x02\x03\x04\x05\x06\x07\x08\t\n\x0b\xFF\xDA\x00\x08\x01\x01\x00\x00?\x00\xbf\x00\xFF\xD9")
body.append(b"")

body.append(f"--{boundary}--".encode("utf-8"))
body.append(b"")

payload_data = b"\r\n".join(body)

upload_req = urllib.request.Request(
    "http://localhost:3000/api/admin/upload",
    data=payload_data,
    headers={
        **auth_header,
        "Content-Type": f"multipart/form-data; boundary={boundary}",
        "Content-Length": str(len(payload_data)),
    }
)

with urllib.request.urlopen(upload_req) as upload_resp:
    res = json.loads(upload_resp.read().decode("utf-8"))
    print("Upload multiple response:", res)
    assert res["success"] == True
    assert len(res["files"]) == 2
    uploaded_cover = res["files"][1]["url"]
    uploaded_photo = res["files"][0]["url"]

# 3. Create a new album with uploaded photos and cover photo
create_album_payload = json.dumps({
    "slug": f"system-upload-test-{uuid.uuid4().hex[:6]}",
    "title": "System Upload Demonstration Album",
    "category": "Sports",
    "date": "September 23, 2026",
    "coverImage": uploaded_cover,
    "description": "Album with photos directly uploaded from system.",
    "status": "published",
    "photos": [
        {"id": "p-1", "src": uploaded_cover, "title": "Cover Photo", "caption": "Selected from system", "date": "Sep 2026"},
        {"id": "p-2", "src": uploaded_photo, "title": "Action Photo", "caption": "Uploaded from local system", "date": "Sep 2026"},
    ],
    "translations": {
        "en": {"title": "System Upload Demonstration Album", "description": "Album with photos directly uploaded from system."},
        "kn": {"title": "ಸಿಸ್ಟಂ ಅಪ್ಲೋಡ್ ಆಲ್ಬಮ್", "description": "ವಿವರಣೆ"},
        "ur": {"title": "سسٹم اپلوڈ البم", "description": "تفصیل"}
    }
}).encode("utf-8")

album_req = urllib.request.Request(
    "http://localhost:3000/api/admin/gallery",
    data=create_album_payload,
    headers={**auth_header, "Content-Type": "application/json"}
)

with urllib.request.urlopen(album_req) as album_resp:
    album_data = json.loads(album_resp.read().decode("utf-8"))
    print("Created album with uploaded photos:", album_data["album"]["id"], album_data["album"]["title"])
    new_album_id = album_data["album"]["id"]

# 4. Now update existing album by adding another photo and changing cover photo
update_album_payload = json.dumps({
    "title": "System Upload Demonstration Album - Updated",
    "category": "Sports",
    "date": "September 23, 2026",
    "coverImage": uploaded_photo,  # change cover
    "description": "Updated album with new photos",
    "status": "published",
    "photos": [
        {"id": "p-1", "src": uploaded_cover, "title": "Cover Photo", "caption": "Selected from system", "date": "Sep 2026"},
        {"id": "p-2", "src": uploaded_photo, "title": "Action Photo", "caption": "Uploaded from local system", "date": "Sep 2026"},
        {"id": "p-3", "src": "/images/instagram/insta_post_10.jpg", "title": "Cosmos Trophy", "caption": "Archived photo", "date": "Aug 2026"}
    ]
}).encode("utf-8")

update_req = urllib.request.Request(
    f"http://localhost:3000/api/admin/gallery/{new_album_id}",
    data=update_album_payload,
    headers={**auth_header, "Content-Type": "application/json"},
    method="PUT"
)

with urllib.request.urlopen(update_req) as update_resp:
    updated_data = json.loads(update_resp.read().decode("utf-8"))
    print("Updated existing album successfully:", updated_data["album"]["coverImage"], len(updated_data["album"]["photos"]), "photos")

print("ALL ADMIN PHOTO UPLOAD AND COVER SELECTION TESTS PASSED!")
