// Test gallery API and pages
async function runTests() {
  console.log("=== 1. Testing GET /api/gallery/posts ===");
  const postsRes = await fetch("http://localhost:3000/api/gallery/posts");
  const postsData = await postsRes.json();
  console.log(`Posts returned: ${postsData.posts?.length}`);
  if (postsData.posts && postsData.posts.length > 0) {
    console.log("Sample post:", {
      id: postsData.posts[0].id,
      title: postsData.posts[0].title,
      albumTitle: postsData.posts[0].albumTitle,
      category: postsData.posts[0].category,
      coverImage: postsData.posts[0].coverImage,
    });
  }

  console.log("\n=== 2. Testing GET /api/gallery/albums ===");
  const albumsRes = await fetch("http://localhost:3000/api/gallery/albums");
  const albumsData = await albumsRes.json();
  console.log(`Albums returned: ${albumsData.albums?.length}`);
  if (albumsData.albums && albumsData.albums.length > 0) {
    console.log("Sample album:", {
      id: albumsData.albums[0].id,
      title: albumsData.albums[0].title,
      photosCount: albumsData.albums[0].photos?.length,
    });
  }

  console.log("\n=== 3. Testing POST /api/admin/gallery/posts (with Admin auth) ===");
  // Generate admin session cookie: { email: "admin@mws.org", role: "admin", name: "Administrator" }
  const sessionPayload = {
    email: "admin@mws.org",
    role: "admin",
    name: "Administrator",
    timestamp: Date.now(),
  };
  const token = Buffer.from(JSON.stringify(sessionPayload)).toString("base64");
  const cookieHeader = `mws_admin_session=${token}`;

  // Test creating a post added to an EXISTING album
  const existingAlbum = albumsData.albums[0];
  const postInExistingAlbum = {
    title: "Youth Match Winning Ceremony",
    caption: "Trophy and medal celebrations in Bhatkal",
    category: "Sports",
    coverImage: "/images/instagram/posts/post_DSh4VECErEA_1.jpg",
    photos: [
      {
        id: `p-${Date.now()}-1`,
        src: "/images/instagram/posts/post_DSh4VECErEA_1.jpg",
        title: "Trophy Presentation",
        caption: "Proud moment on the dais",
        date: "Oct 2026",
      },
    ],
    albumOption: "existing",
    albumId: existingAlbum.id,
    status: "published",
  };

  const createRes1 = await fetch("http://localhost:3000/api/admin/gallery/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieHeader,
    },
    body: JSON.stringify(postInExistingAlbum),
  });
  const createData1 = await createRes1.json();
  console.log("Create in Existing Album status:", createRes1.status, createData1);

  // Test creating a post with a NEW album
  const postWithNewAlbum = {
    title: "Community Healthcare Camp 2026",
    caption: "Free health checkups and medicine distribution",
    category: "Welfare",
    coverImage: "/images/real/15aug5.jpeg",
    photos: [
      {
        id: `p-${Date.now()}-2`,
        src: "/images/real/15aug5.jpeg",
        title: "Doctors and Volunteers at Camp",
        caption: "Medical team assembled",
        date: "Oct 2026",
      },
    ],
    albumOption: "new",
    newAlbumTitle: "Healthcare & Medical Camps 2026",
    newAlbumCategory: "Welfare",
    newAlbumDescription: "Annual healthcare drives for Madeena Colony",
    status: "published",
  };

  const createRes2 = await fetch("http://localhost:3000/api/admin/gallery/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieHeader,
    },
    body: JSON.stringify(postWithNewAlbum),
  });
  const createData2 = await createRes2.json();
  console.log("Create with New Album status:", createRes2.status, createData2);

  console.log("\n=== 4. Testing GET /gallery HTML page ===");
  const galleryPageRes = await fetch("http://localhost:3000/gallery");
  console.log("Gallery Page status:", galleryPageRes.status);
  const galleryHtml = await galleryPageRes.text();
  console.log("Gallery Page contains 'Moments, Memories & Photo Stories':", galleryHtml.includes("Moments, Memories & Photo Stories"));

  console.log("\n=== 5. Testing GET /admin/gallery/post/create HTML page ===");
  const createPageRes = await fetch("http://localhost:3000/admin/gallery/post/create", {
    headers: { Cookie: cookieHeader },
  });
  console.log("Create Post Page status:", createPageRes.status);

  console.log("\n=== 6. Re-fetching Posts from public API to verify new additions ===");
  const updatedPostsRes = await fetch("http://localhost:3000/api/gallery/posts");
  const updatedPostsData = await updatedPostsRes.json();
  console.log(`Updated posts count: ${updatedPostsData.posts?.length}`);
  const addedPost = updatedPostsData.posts?.find((p) => p.title === "Community Healthcare Camp 2026");
  console.log("Found newly created post with new album:", !!addedPost, addedPost ? { title: addedPost.title, albumTitle: addedPost.albumTitle } : null);
}

runTests().catch(console.error);
