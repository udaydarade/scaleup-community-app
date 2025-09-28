let _id = 1;
const uid = () => String(_id++);

export const db = {
  users: [{ id: 'u1', name: 'IITB Student', impact: 0, badges: [] }],
  communities: [
    { id: 'c1', name: 'IITB General', parentId: null, members: ['u1'], posts: [] },
    { id: 'c2', name: 'Hostel 8', parentId: 'c1', members: ['u1'], posts: [] },
  ],
  notifications: [],
};

function updateBadges(user) {
  const badges = [];
  if (user.impact >= 10) {
    badges.push('Rising Star ⭐');
  }
  if (user.impact >= 25) {
    badges.push('Community Pillar 🏛️');
  }
  if (user.impact >= 50) {
    badges.push('Campus Legend 🔥');
  }
  user.badges = badges;
}

export const api = {
  listCommunities(){ return new Promise(res => setTimeout(() => res([...db.communities]), 50)); },
  createCommunity({ name, parentId = null }){
    return new Promise(res => setTimeout(()=>{
      const c = { id: uid(), name, parentId, members: [], posts: [] };
      db.communities.push(c);
      // Add communityId to the notification
      db.notifications.unshift({ id: uid(), text: `New community created: ${name}`, communityId: c.id, ts: Date.now() });
      res(c);
    },50));
  },
  joinCommunity({ userId, communityId }){
    return new Promise(res => setTimeout(()=>{
      const c = db.communities.find(x=>x.id===communityId);
      if (!c.members.includes(userId)) c.members.push(userId);
      // Add communityId to the notification
      db.notifications.unshift({ id: uid(), text: `Joined ${c.name}`, communityId: c.id, ts: Date.now() });
      res(c);
    },50));
  },
  
  // autoJoinChild({ userId, parentId }){
  //   return new Promise(res => setTimeout(()=>{
  //     const child = db.communities.find(x=>x.parentId===parentId);
  //     if (child && !child.members.includes(userId)) {
  //       child.members.push(userId);
  //       db.notifications.unshift({ id: uid(), text: `Auto-joined ${child.name}`, ts: Date.now() });
  //     }
  //     res(child||null);
  //   },50));
  // },
    leaveCommunity({ userId, communityId }){
    return new Promise(res => setTimeout(()=>{
      const c = db.communities.find(x => x.id === communityId);
      // Filter out the user's ID from the members array
      c.members = c.members.filter(id => id !== userId);
      db.notifications.unshift({ id: uid(), text: `You left ${c.name}`,communityId: c.id, ts: Date.now() });
      res(c);
    }, 50));
  },
  autoJoinChild({ userId, parentId }){
    // 2. To reduce lag, you can lower this number (e.g., to 50ms)
    return new Promise(res => setTimeout(()=>{
      const children = db.communities.filter(c => c.parentId === parentId);
      
      children.forEach(child => {
        if (!child.members.includes(userId)) {
          child.members.push(userId);
          // 1. FIX THE TYPO: Use child.id instead of c.id
          db.notifications.unshift({ id: uid(), text: `Auto-joined ${child.name}`, communityId: child.id, ts: Date.now() });
        }
      });
      
      res(children); 
    }, 50)); // You can change 50 to a smaller number like 50 for less lag
  },
  createPost({ communityId, userId, text }){
    return new Promise(res => setTimeout(()=>{
      const c = db.communities.find(x=>x.id===communityId);
      const p = { id: uid(), text, userId, ts: Date.now(), up: 0, down: 0, comments: [] };
      c.posts.unshift(p);
      const u = db.users.find(x => x.id === userId);
      if (u) {
        u.impact = (u.impact || 0) + 3;
        updateBadges(u);
      }
      // Add communityId and postId to the notification
      db.notifications.unshift({ id: uid(), text: `New post in ${c.name}`, communityId, postId: p.id, ts: Date.now() });
      res(p);
    }, 50));
  },
  
  // votePost({ communityId, postId, delta }){
  //   return new Promise(res => setTimeout(()=>{
  //     const c = db.communities.find(x=>x.id===communityId);
  //     const p = c.posts.find(x=>x.id===postId);
  //     if (delta>0) p.up+=1; else p.down+=1;
  //     const u = db.users.find(x=>x.id===p.userId);
  //     u.impact = Math.max(0, (u.impact||0) + delta);
  //     res(p);
  //   },120));
  // },
    votePost({ postId, delta }){
    return new Promise(res => setTimeout(()=>{
      let p, c;
      // Find the post and its parent community
      for (const community of db.communities) {
        const post = community.posts.find(x => x.id === postId);
        if (post) {
          p = post;
          c = community;
          break;
        }
      }

      if (p) {
        if (delta > 0) p.up += 1; else p.down += 1;
        const u = db.users.find(x => x.id === p.userId);
        if (u) {
          u.impact = (u.impact || 0) + delta; 
          updateBadges(u);
        db.notifications.unshift({ id: uid(), text: `Someone ${delta > 0 ? 'upvoted' : 'downvoted'} your post in ${c.name}`, communityId: c.id, postId: p.id, ts: Date.now() });
        }
        res(p);
      } else {
        res(null); // Post not found
      }
    }, 120));
  },

    addComment({ postId, userId, text }) {
    return new Promise(res => setTimeout(() => {
      let p, c;
      // Find the post
      for (const community of db.communities) {
        const post = community.posts.find(x => x.id === postId);
        if (post) {
          p = post;
          c = community;
          break;
        }
      }

      if (p) {
        // Create the new comment
        const comment = { id: uid(), userId, text, ts: Date.now() };
        // Add comment to the post (initialize array if it doesn't exist)
        if (!p.comments) p.comments = [];
        p.comments.push(comment);

        // Find the commenter and award 2 Karma points
        const u = db.users.find(x => x.id === userId);
        if (u) {
          u.impact = (u.impact || 0) + 2;
          updateBadges(u);
        }

        db.notifications.unshift({ id: uid(), text: `${u.name} commented on a post in ${c.name}`, communityId: c.id, postId: p.id,ts: Date.now() });
        res(p);
      } else {
        res(null);
      }
    }, 50));
  },

    voteComment({ commentId, delta }) {
    return new Promise(res => setTimeout(() => {
      let comment, postAuthor;
      // Find the comment
      for (const community of db.communities) {
        for (const post of community.posts) {
          if (post.comments) {
            const foundComment = post.comments.find(c => c.id === commentId);
            if (foundComment) {
              comment = foundComment;
              break;
            }
          }
        }
        if (comment) break;
      }

      if (comment) {
        // Initialize votes if they don't exist
        if (comment.up === undefined) comment.up = 0;
        if (comment.down === undefined) comment.down = 0;
        
        // Update votes and user Karma
        if (delta > 0) comment.up += 1; else comment.down += 1;
        const u = db.users.find(x => x.id === comment.userId);
        if (u) {
          u.impact = (u.impact || 0) + delta;
          updateBadges(u);
        }
        res(comment);
      } else {
        res(null);
      }
    }, 120));
  },

  listNotifications(){ return new Promise(res => setTimeout(()=>res(db.notifications),150)); },
  currentUser(){ return db.users[0]; }
};
