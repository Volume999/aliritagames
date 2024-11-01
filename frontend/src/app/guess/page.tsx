"use client";
import { UserService } from "@/services/users";
import { User } from "@/types/user";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Guess() {
  const [friends, setFriends] = useState<User[]>([]);
  const { data: session } = useSession();
  useEffect(() => {
    const userService = new UserService();
    async function loadFriends() {
      if (session?.user?.id) {
        const currentUserId = session.user.id;
        const userFriendsIds = await userService.getUserFriends(currentUserId);
        const userFriends = await Promise.all(
          userFriendsIds.map((userId) => userService.getUser(userId)),
        );
        setFriends(userFriends);
      }
    }
    loadFriends();
  }, [session]);
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div>
        <h2 className="text-lg mb-4">Friends List</h2>
        {friends.map((friend) => (
          <div key={friend.id}>{friend.username}</div>
        ))}
      </div>
    </div>
  );
}
