export type UserId = string;

export type User = {
  id: UserId;
  username: string;
};

export type Friendship = {
  userId: UserId;
  friends: UserId[];
};
