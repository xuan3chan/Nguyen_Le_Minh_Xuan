import { Model } from "mongoose";
import User, { IUpdateUser, IUser } from "../model/user.model";
import bcrypt from "bcrypt";
import { BadRequest, NotFound } from "http-errors";

export class UserService {
  constructor(private readonly userModel: Model<IUser> = User) {}

  // Create a new user after validating and hashing password
  public async createUserService(
    user: IUser
  ): Promise<{ status: number; message: string }> {
    try {
      user.email = user.email.trim().toLowerCase();

      // Check if the email already exists
      const userExists = await this.userModel.findOne({ email: user.email }).lean();
      if (userExists) {
        throw new BadRequest("Email already exists");
      }

      // Hash the password and create the user
      const hashedPassword = await bcrypt.hash(user.password, 10);
      await this.userModel.create({ ...user, password: hashedPassword });

      return { status: 201, message: "User created successfully" };
    } catch (error) {
      console.error("Error creating user:", error);
      throw error; // Propagate error
    }
  }

  // List users with optional filters
  public async listUserService(
    page: number = 1,
    limit: number = 10,
    sortOrder: string = "asc",
    filterField?: string,
    filterValue?: string,
    searchKey?: string
  ): Promise<{ status: number; message: string; data: IUser[] }> {
    try {
      let filter: any = {};
      if (filterField && filterValue) {
        filter[filterField] = filterValue;
      }
      if (searchKey) {
        filter["$or"] = [
          { fullName: { $regex: searchKey, $options: "i" } },
          { email: { $regex: searchKey, $options: "i" } },
        ];
      }
      // Fetch and return filtered users
      const users = await this.userModel
        .find(filter)
        .limit(limit)
        .skip((page - 1) * limit)
        .sort({ createdAt: sortOrder === "asc" ? 1 : -1 })
        .select("-password -__v")
        .lean();
      return {
        status: 200,
        message: "List of users successfully retrieved",
        data: users,
      };
    } catch (error) {
      console.error("Error listing users:", error);
      throw error; // Propagate error
    }
  }

  // Get details of a user by ID
  public async getDetailUserService(
    userId: string
  ): Promise<{ status: number; message: string; data: IUser }> {
    try {
      const user = await this.userModel.findById(userId).select("-password -__v").lean();
      if (!user) {
        throw new NotFound("User not found");
      }
      return { status: 200, message: "User found", data: user };
    } catch (error) {
      console.error("Error getting user detail:", error);
      throw error; // Propagate error
    }
  }

  // Update user details, including password change if provided
  public async updateUserService(
    userId: string,
    userData: IUpdateUser
  ): Promise<{ status: number; message: string }> {
    try {
      const user = await this.userModel.findById(userId).lean();
      if (!user) {
        throw new NotFound("User not found");
      }

      // Hash password if it's updated
      if (userData.password) {
        userData.password = await bcrypt.hash(userData.password, 10);
      }

      // Update user data
      await this.userModel.findByIdAndUpdate(userId, userData, { new: true });
      return { status: 200, message: "User updated successfully" };
    } catch (error) {
      console.error("Error updating user:", error);
      throw error; // Propagate error
    }
  }

  public async deleteUserService(userId: string): Promise<{ status: number; message: string }> {
    try {
      const user = await this.userModel.findById(userId).lean();
      if (!user) {
        throw new NotFound("User not found");
      }

      await this.userModel.findByIdAndDelete(userId);
      return { status: 200, message: "User deleted successfully" };
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error; // Propagate error
    }
  }
}
