# Chat App Friend System Updates

## Overview
This document outlines the recent modifications made to the friend system in the chat application.

**Changes Requested by User:**
1. Provide best-practice fixes to the existing friend system architecture (sending requests via username instead of ID on frontend, and mapping it on the backend).
2. Integrate `ActivityBar` into `FreindsLayout.jsx`.
3. Undo Real-Time Socket.io integrations added during initial fixes.
4. Ensure CSS styling is responsive.

## Files Modified

### Backend (Server)
* **`server/src/db/dbAccessLayers/freinds.js`**
  - Added `getPendingRequestsDB` to query joining `users` and `freind_requests` to fetch pending requests targeted at the logged-in user.
* **`server/src/controllers/freindsController.js`**
  - Updated `sendRequest` to take a `username`, lookup the `userId` in the DB, and insert the request properly.
  - Added `getPendingRequests` to serve pending requests.
  - Undid Socket.IO real-time emission logic completely.
* **`server/src/routes/freindsRoutes.js`**
  - Registered `GET /pending` mapped to `getPendingRequests`.
* **`server/server.js`**
  - Reverted Socket.IO global export since real-time events were undone.

### Frontend (Client)
* **`frontend/src/api/freindsApi.js`**
  - Added API fetch calls: `sendFriendRequestAPI`, `getPendingRequestsAPI`, `acceptFriendRequestAPI`, `rejectFriendRequestAPI`.
* **`frontend/src/components/freinds/AddFriends.jsx`**
  - Hooked up the UI logic to use `sendFriendRequestAPI` and display success/error states on the screen.
* **`frontend/src/components/freinds/PendingRequests.jsx`** (NEW FILE)
  - Created a new React component to fetch and display pending incoming requests with Accept/Reject buttons.
* **`frontend/src/components/layout/FreindsLayout.jsx`**
  - Imported and rendered `<ActivityBar />` alongside the main content layout.
  - Removed internal Socket.IO tracking logic.
* **`frontend/src/components/public/css/freindPage.css`**
  - Adjusted `.freinds-layout-container` to `flex-direction: row` to accommodate the `ActivityBar`.
  - Added `.freinds-main-content` wrapper for main content.
  - Added CSS media queries to ensure the Activity Bar and list view collapse predictably on mobile devices (`max-width: 768px`).
* **`frontend/src/components/Login.jsx`**
  - Restored to its original intent (removed saving `userId` in `localStorage` which was originally used solely for Socket mappings).
