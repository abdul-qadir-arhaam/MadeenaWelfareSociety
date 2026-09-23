export interface GalleryPhoto {
  id: string;
  src: string;
  title: string;
  caption?: string;
  date: string;
}

export interface GalleryAlbum {
  slug: string;
  title: string;
  category: string;
  date: string;
  coverImage: string;
  description: string;
  containCover?: boolean;
  photos: GalleryPhoto[];
}

export const GALLERY_ALBUMS: GalleryAlbum[] = [
  {
    slug: "independence-day-celebration",
    title: "Independence Day Celebration",
    category: "Celebration",
    date: "August 15, 2026",
    coverImage: "/images/real/15aug.jpeg",
    description:
      "Memorable glimpses from the 80th Independence Day flag hoisting, student parade, and merit kits distribution organized by Madeena Welfare Society at the Anjuman Institute campus in Bhatkal.",
    photos: [
      {
        id: "id-1",
        src: "/images/real/15aug.jpeg",
        title: "Community Gathering & Flag Assembly",
        caption: "Community members, students with the tricolor, and dignitaries gathered at Anjuman Institute.",
        date: "Aug 15, 2026",
      },
      {
        id: "id-2",
        src: "/images/real/15aug1.jpeg",
        title: "Tricolor Flag Unfurling",
        caption: "Dignitaries unfurling the Indian National Flag with flower petals raining down.",
        date: "Aug 15, 2026",
      },
      {
        id: "id-3",
        src: "/images/real/15aug2.jpeg",
        title: "Saluting the National Flag",
        caption: "Dignitaries and community leaders saluting the flagpole during the anthem.",
        date: "Aug 15, 2026",
      },
      {
        id: "id-4",
        src: "/images/real/15aug3.jpeg",
        title: "Dignitaries at Flag Base",
        caption: "President and executive committee leaders standing in solemn attention.",
        date: "Aug 15, 2026",
      },
      {
        id: "id-5",
        src: "/images/real/15aug4.jpeg",
        title: "Leadership Tribute",
        caption: "Community elders and committee members paying tribute to the nation.",
        date: "Aug 15, 2026",
      },
      {
        id: "id-6",
        src: "/images/real/15aug5.jpeg",
        title: "Staff, Students & Children Assembly",
        caption: "Children in traditional attire alongside community volunteers and professors.",
        date: "Aug 15, 2026",
      },
      {
        id: "id-7",
        src: "/images/real/15aug6.jpeg",
        title: "Anjuman Institute Campus Assembly",
        caption: "Panoramic view of the patriotic assembly outside Anjuman Institute of Technology.",
        date: "Aug 15, 2026",
      },
      {
        id: "id-8",
        src: "/images/instagram/insta_post_11.jpg",
        title: "Official Address from the Rostrum",
        caption: "Keynote address delivered from the official Madeena Welfare Society rostrum.",
        date: "Aug 15, 2026",
      },
    ],
  },
  {
    slug: "community-sports-event",
    title: "Community Sports & Cricket Championship",
    category: "Sports",
    date: "Official Instagram Archive",
    coverImage: "/images/instagram/posts/post_DSh4VECErEA_1.jpg",
    description:
      "Triumphant moments from the Madeena Welfare Society sports teams. From night turf leagues to the Cosmos Golden Jubilee Trophy, celebrating exceptional athletic spirit and victory in Bhatkal.",
    photos: [
      {
        id: "sp-1",
        src: "/images/instagram/posts/post_DSh4VECErEA_1.jpg",
        title: "Championship Victory with Medals",
        caption: "The victorious Madeena squad proudly wearing gold medals and official tournament jerseys.",
        date: "Dec 21, 2025",
      },
      {
        id: "sp-2",
        src: "/images/instagram/insta_post_10.jpg",
        title: "Cosmos Golden Jubilee Trophy Winners (₹75,000)",
        caption: "The complete championship squad with the winner trophy and banner in Bhatkal.",
        date: "Dec 2025",
      },
      {
        id: "sp-3",
        src: "/images/instagram/insta_post_8.jpg",
        title: "Madeena Society Champions Poster",
        caption: "Official club felicitation poster celebrating outstanding teamwork and consistent performance.",
        date: "Instagram Post",
      },
      {
        id: "sp-4",
        src: "/images/instagram/insta_post_9.jpg",
        title: "Garlanded Victory Procession",
        caption: "Champion player carried on shoulders through Madeena Colony streets amid celebrations.",
        date: "Bhatkal Parade",
      },
      {
        id: "sp-5",
        src: "/images/instagram/posts/post_DUcvUHVkYX-_1.jpg",
        title: "Night Turf Tournament Squad",
        caption: "Players assembled under the stadium floodlights for the high-intensity evening cup.",
        date: "Turf League",
      },
      {
        id: "sp-6",
        src: "/images/instagram/insta_post_14.jpg",
        title: "Squad Team Spirit",
        caption: "Players gathered on the turf pitch celebrating unity and sportsmanship.",
        date: "League Match",
      },
      {
        id: "sp-7",
        src: "/images/instagram/insta_post_16.jpg",
        title: "Pitch Victory Rush",
        caption: "Players storming the field after winning the thrilling final by 6 wickets.",
        date: "Finals Victory",
      },
      {
        id: "sp-8",
        src: "/images/instagram/insta_post_15.jpg",
        title: "Match-Winning Knock (43 off 15 balls)",
        caption: "Effortless dominance from Ilyas Motia requiring 43 off 10 balls to seal the championship.",
        date: "Player of the Match",
      },
      {
        id: "sp-9",
        src: "/images/instagram/posts/post_DTnVq56kvaM_1.jpg",
        title: "Bowling Action Masterclass",
        caption: "Pace bowler in smooth delivery stride at Bhatkal sports grounds.",
        date: "BPL Highlight",
      },
      {
        id: "sp-10",
        src: "/images/instagram/insta_post_17.jpg",
        title: "Bhatkal Premier League Masterclass",
        caption: "Shamoun Shabandri recording outstanding bowling figures of 3-0-18-3.",
        date: "BPL 2026",
      },
      {
        id: "sp-11",
        src: "/images/instagram/insta_post_19.jpg",
        title: "Six Gigantic Sixes by Ubadah Barmawar",
        caption: "Sensational power hitting display dismantling the opposition attack.",
        date: "Match Reel",
      },
      {
        id: "sp-12",
        src: "/images/instagram/reels/reel_DUYmoRgAVLC_1.jpg",
        title: "Incredible Bhatkal Celebration Reel",
        caption: "Viral community celebration reel featured across Bhatkal media channels.",
        date: "Feb 5, 2026",
      },
    ],
  },
  {
    slug: "instagram-feed-highlights",
    title: "Official Instagram Feed & Highlights",
    category: "Social Media",
    date: "@madeenawelfaresociety",
    coverImage: "/images/instagram/insta_post_8.jpg",
    description:
      "Direct feed from the official Instagram page (@madeenawelfaresociety). Featuring event posters, championship reels, community announcements, and festivity greetings.",
    photos: [
      {
        id: "ig-1",
        src: "/images/instagram/insta_post_8.jpg",
        title: "Champions Felicitation & Crest",
        caption: "Official club post congratulating the sports team on their championship win.",
        date: "Official Feed",
      },
      {
        id: "ig-2",
        src: "/images/instagram/posts/post_DWEos2UD_VB_1.jpg",
        title: "Eid Ul Fitr Mubarak Post",
        caption: "Official Eid greetings to community members worldwide from Madeena Welfare Society.",
        date: "Mar 19, 2026",
      },
      {
        id: "ig-3",
        src: "/images/instagram/posts/post_DU5jtX9jD3-_1.jpg",
        title: "Ramadan Mubarak Announcement",
        caption: "Blessed Ramadan greetings and welfare relief schedule announcement.",
        date: "Mar 2026",
      },
      {
        id: "ig-4",
        src: "/images/instagram/reels/reel_DSr4abEjMRn_1.jpg",
        title: "Champions Celebration Video Reel",
        caption: "Highlight reel showcasing trophy presentation and celebration moments.",
        date: "Instagram Reel",
      },
      {
        id: "ig-5",
        src: "/images/instagram/reels/reel_DcEoePATMOv_1.jpg",
        title: "Tournament Highlight Reel",
        caption: "Key moments and match-winning performances from community tournament.",
        date: "Instagram Reel",
      },
      {
        id: "ig-6",
        src: "/images/instagram/reels/reel_DUYmoRgAVLC_1.jpg",
        title: "Victory Moment Reel",
        caption: "270+ likes on Instagram celebrating victory under stadium floodlights.",
        date: "Instagram Reel",
      },
      {
        id: "ig-7",
        src: "/images/instagram/reels/reel_DUYleL2kvg3_1.jpg",
        title: "Sports Brotherhood Reel",
        caption: "Team celebration and player camaraderie captured on the pitch.",
        date: "Instagram Reel",
      },
      {
        id: "ig-8",
        src: "/images/instagram/reels/reel_DSozDQWEmRy_1.jpg",
        title: "Match Deciding Moment",
        caption: "Final overs thriller and winning runs celebration.",
        date: "Instagram Reel",
      },
      {
        id: "ig-9",
        src: "/images/instagram/reels/reel_DT7RVjbkqQS_1.jpg",
        title: "Community Match Reel",
        caption: "Fielding and bowling action during the championship match.",
        date: "Instagram Reel",
      },
      {
        id: "ig-10",
        src: "/images/instagram/reels/reel_DTkVpSVkuuc_1.jpg",
        title: "Athletic Highlights Reel",
        caption: "Top bowling and batting performances captured on camera.",
        date: "Instagram Reel",
      },
    ],
  },
  {
    slug: "community-support-welfare",
    title: "Community Welfare & Festivities",
    category: "Welfare",
    date: "Community Outreach",
    coverImage: "/images/instagram/insta_post_12.jpg",
    description:
      "Grassroots community welfare initiatives by Madeena Welfare Society in Madeena Colony and surrounding Bhatkal areas, including festive ration distribution, civic programs, and healthcare support.",
    photos: [
      {
        id: "wf-1",
        src: "/images/instagram/insta_post_12.jpg",
        title: "Eid Ul Fitr Welfare & Greetings",
        caption: "Special welfare packages distributed to underprivileged families ahead of Eid.",
        date: "Apr 2026",
      },
      {
        id: "wf-2",
        src: "/images/instagram/insta_post_13.jpg",
        title: "Ramadan Mubarak Welfare Drive",
        caption: "Annual Ramadan grocery distribution and community Iftar sponsorship drive.",
        date: "Mar 2026",
      },
      {
        id: "wf-3",
        src: "/images/real/15aug5.jpeg",
        title: "Community Volunteers & Leaders Assembly",
        caption: "Civic workers and volunteers assembled for neighborhood development planning.",
        date: "Community Hall",
      },
      {
        id: "wf-4",
        src: "/images/real/15aug6.jpeg",
        title: "Civic Outreach at Campus Grounds",
        caption: "General body gathering discussing student scholarship grants and welfare programs.",
        date: "Campus Grounds",
      },
      {
        id: "wf-5",
        src: "/images/instagram/posts/post_DWEos2UD_VB_1.jpg",
        title: "Community Goodwill Announcement",
        caption: "Official public message encouraging mutual support and charitable giving.",
        date: "Official Notice",
      },
      {
        id: "wf-6",
        src: "/images/instagram/posts/post_DU5jtX9jD3-_1.jpg",
        title: "Ramadan Charity Distribution Schedule",
        caption: "Timetable for medical relief and family financial grants during the holy month.",
        date: "Official Schedule",
      },
    ],
  },
  {
    slug: "our-logo-heritage",
    title: "Our Official Crest & Heritage",
    category: "Identity",
    date: "Established 1960",
    coverImage: "/images/official-logo.png",
    containCover: true,
    description:
      "The authentic crest and emblem of Madeena Welfare Society Bhatkal (Regd. USA 1960). Representing welfare, education, sportsmanship, and dedicated service to the community.",
    photos: [
      {
        id: "lg-1",
        src: "/images/official-logo.png",
        title: "Official Madeena Welfare Society Crest",
        caption: "The authentic circular insignia with English and Urdu titles, three red stars, and green wreath.",
        date: "Official Crest",
      },
      {
        id: "lg-2",
        src: "/images/official-logo-white.png",
        title: "Vector Emblem for White Backgrounds",
        caption: "High-contrast version designed for documents, banners, and digital portal headers.",
        date: "Design Asset",
      },
      {
        id: "lg-3",
        src: "/images/instagram/insta_post_8.jpg",
        title: "Society Crest on Champions Felicitation",
        caption: "The official insignia proudly featured atop championship posters and announcements.",
        date: "Club Media",
      },
      {
        id: "lg-4",
        src: "/images/instagram/insta_post_11.jpg",
        title: "Society Insignia on Official Dais Rostrum",
        caption: "Official metallic seal mounted on the podium during major society conventions in Bhatkal.",
        date: "Assembly Rostrum",
      },
    ],
  },
];
