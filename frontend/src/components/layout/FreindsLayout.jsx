import { useState } from "react";
import { Header } from "../freinds/Header.jsx";
import { FreindsList } from "../freinds/FreindsList.jsx";
import { AddFriends } from "../freinds/AddFriends.jsx";
import { PendingRequests } from "../freinds/PendingRequests.jsx";
import { ActivityBar } from '../sidebare/ActivityBar.jsx';
import '../public/css/freindPage.css';
const navList = ["Online", "All", "Pending", "Add Freind"];

export const FreindsLayout = () => {
    const [activeItem, setActiveItem] = useState('All');

    return (
        <div className="freinds-layout-container">
            <ActivityBar />
            <div className="freinds-main-content">
                <Header navBarList={navList} setActiveItem={setActiveItem} />
                <div className="friends-content">
                    {activeItem === "All" && <FreindsList type="all" />}
                    {activeItem === "Online" && <FreindsList type="online" />}
                    {activeItem === "Pending" && <PendingRequests />}
                    {activeItem === "Add Freind" && <AddFriends />}
                </div>
            </div>
        </div>
    );
}