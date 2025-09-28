# ScaleUp Community App 🚀

A React Native + Expo prototype for a student/community platform with gamified engagement. Users can join communities, post, comment, earn badges, and track their growth.

## ✨ Features

### 🏘️ Communities
- Browse available communities
- Create communities (requires minimum 10 karma points for parent communities)
- Search for communities
- Join or leave communities
- Auto-join child communities (e.g., "Institute" → auto-joins "Hostel 8")

### 📰 Community Feed
- View posts within a community
- Create new posts
- Upvote/downvote posts
- Comment on posts with nested voting

### 🔔 Notifications
Get updates when:
- You join a community
- New posts appear in your communities
- Someone comments on your post
- Someone upvotes/downvotes your post

All notifications are stored in your feed.

### 👤 Profile
- View your impact points (karma)
- See badges you've unlocked:
  - ⭐ **Rising Star** (10+ impact)
  - 🏛️ **Community Pillar** (25+ impact)
  - 🔥 **Campus Legend** (50+ impact)
- Tabs for:
  - Posts you've created
  - Comments you've made
  - Activity feed of your contributions

### 🏅 Gamification System
Earn impact points for:
- **+3** → Creating a post
- **+2** → Adding a comment
- **+1** → Getting an upvote

Unlock badges at milestones!

## 🛠️ Tech Stack

- **React Native (Expo)** → UI + navigation
- **React Navigation** → Stack + Tab navigators
- **React Context API** → Global store (`store.js`)
- **Mock Backend** → In-memory database (`mockDB.js`)

## 📂 Project Structure

```
scaleup-community-app
│
├── App.js                    # Root setup: navigation + store
├── store.js                  # Global state (communities, notifications, user)
├── mockDB.js                 # Fake backend API + gamification logic
├── screens/
│   ├── ProfileScreen.js      # User profile (posts, comments, activity, badges)
│   ├── CommunitiesScreen.js  # Browse & join communities
│   ├── CommunityFeedScreen.js# Posts feed per community
│   ├── NotificationsScreen.js# User notifications
│   └── ...                   # Other screens
└── README.md                 # Project documentation
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- Expo CLI
- Expo Go app on your mobile device (optional)

### Installation

**1️⃣ Clone the repository**
```bash
git clone https://github.com/udaydarade/scaleup-community-app.git
cd scaleup-community-app
```

**2️⃣ Install dependencies**
```bash
npm install
```

**3️⃣ Start the development server**
```bash
expo start
```

**4️⃣ Run the app**
- Scan the QR code with Expo Go app on your phone
- Or run in an iOS/Android emulator

## 📸 Screenshots

> Add your screenshots here:
> - Communities Screen
> - Community Feed
> - Notifications
> - Profile

## 🎯 Vision

This project serves as a prototype for a campus/community platform designed to:

- **Connect students** through interest or location-based communities
- **Encourage contributions** with impact points and badges
- **Keep everyone engaged** with notifications and activity feeds

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Author

- **Uday Darade** - [@udaydarade](https://github.com/udaydarade)

## 🙏 Acknowledgments

- Built with React Native and Expo
- Inspired by community-driven platforms
- Special thanks to the open-source community

---

⭐ **Star this repository if you found it helpful!**