"use client";
import { UserService } from "@/services/users";
import { User, UserId } from "@/types/user";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

export default function Guess() {
  const [friends, setFriends] = useState<User[]>([]);
  const { data: session } = useSession();
  const [inviting, setInviting] = useState<UserId | null>(null);
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
  const handleInvite = (userId: UserId) => {
    console.log("Inviting userId: ", userId);
    setInviting(userId);
  };
  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <div className="w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-4">Challenge Friends</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Username</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {friends.map((friend) => (
              <TableRow key={friend.id}>
                <TableCell>{friend.username}</TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="outline"
                    onClick={() => handleInvite(friend.id)}
                    disabled={inviting === friend.id}
                  >
                    {inviting === friend.id ? "Inviting..." : "Challenge"}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
