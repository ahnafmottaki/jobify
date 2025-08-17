interface User {
  createdAt: string;
  email: string;
  lastName: string;
  location: string;
  name: string;
  role: string;
  updatedAt: string;
  _id: string;
  avatar?: string;
  avatarPublicId?: string;
}

export type { User };
