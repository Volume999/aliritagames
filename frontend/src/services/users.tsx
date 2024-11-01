import { Friendship, User, UserId } from "@/types/user";

const HARDCODED_USERS: User[] = [
  { id: "1", username: "Ali" },
  { id: "2", username: "Margo" },
  { id: "3", username: "Guest" },
];

const HARDCODED_FRIENDSHIPS: Friendship[] = [
  { userId: "1", friends: ["2"] },
  { userId: "2", friends: ["1"] },
];

export class UserService {
  async getUser(userId: UserId): Promise<User> {
    const user = HARDCODED_USERS.find((user) => user.id === userId);
    if (!user) {
      throw new Error(`User not found with id: ${userId}`);
    }
    return user;
  }

  async getUserFriends(userId: UserId): Promise<UserId[]> {
    const userFriends = HARDCODED_FRIENDSHIPS.find(
      (friendships) => friendships.userId === userId,
    );
    if (!userFriends) {
      return [];
    }
    return userFriends.friends;
  }
}
