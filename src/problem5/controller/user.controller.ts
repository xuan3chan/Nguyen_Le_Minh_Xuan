import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { IUpdateUser, IUser } from "../model/user.model";
import { BadRequest, NotFound } from "http-errors";

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService(); // Initialize the UserService
  }

  // Create a new user
  public createUserController = async (
    req: Request,
    res: Response
  ): Promise<any> => {
    const userData: IUser = req.body;
    try {
      const result = await this.userService.createUserService(userData); // Call service to create user
      return res.status(result.status).json({
        message: result.message,
      });
    } catch (error) {
      console.error("Error creating user:", error);

      // Handle specific error for bad request (email exists)
      if (error instanceof BadRequest) {
        return res.status(400).json({
          message: error.message,
          statusCode: 400,
        });
      }

      // General error handling for server issues
      return res.status(500).json({
        message: "Internal server error",
        error: (error as Error).message,
      });
    }
  };

  // List users with filters and pagination
  public listUserController = async (
    req: Request,
    res: Response
  ): Promise<any> => {
    const { page, limit, sortOrder, filterField, filterValue, searchKey } =
      req.query;
    try {
      const result = await this.userService.listUserService(
        parseInt(page as string),
        parseInt(limit as string),
        sortOrder as string,
        filterField as string,
        filterValue as string,
        searchKey as string
      );
      return res.status(result.status).json({
        message: result.message,
        data: result.data,
      });
    } catch (error) {
      console.error("Error listing users:", error);
      // General error handling for server issues
      return res.status(500).json({
        message: "Internal server error",
        error: (error as Error).message,
      });
    }
  };

  // Get user details by ID
  public getUserController = async (
    req: Request,
    res: Response
  ): Promise<any> => {
    const { id } = req.params;
    try {
      const result = await this.userService.getDetailUserService(id); // Call service to get user details
      return res.status(result.status).json({
        message: result.message,
        data: result.data,
      });
    } catch (error) {
      console.error("Error fetching user details:", error);

      // Handle 'not found' error
      if (error instanceof NotFound) {
        return res.status(404).json({
          message: error.message,
          statusCode: 404,
        });
      }

      // General error handling for server issues
      return res.status(500).json({
        message: "Internal server error",
        error: (error as Error).message,
      });
    }
  };

  // Update user details
  public updateUserController = async (
    req: Request,
    res: Response
  ): Promise<any> => {
    const { id } = req.params;
    const userData: IUpdateUser = req.body;
    try {
      const result = await this.userService.updateUserService(id, userData); // Call service to update user
      return res.status(result.status).json({
        message: result.message,
      });
    } catch (error) {
      console.error("Error updating user:", error);
      // Handle 'not found' error
      if (error instanceof NotFound) {
        return res.status(404).json({
          message: error.message,
          statusCode: 404,
        });
      }
      // General error handling for server issues
      return res.status(500).json({
        message: "Internal server error",
        error: (error as Error).message,
      });
    }
  };
  public deleteUserController = async (
    req: Request,
    res: Response
  ): Promise<any> => {
    const { id } = req.params;
    try {
      const result = await this.userService.deleteUserService(id); // Call service to delete user
      return res.status(result.status).json({
        message: result.message,
      });
    } catch (error) {
      console.error("Error deleting user:", error);
      // Handle 'not found' error
      if (error instanceof NotFound) {
        return res.status(404).json({
          message: error.message,
          statusCode: 404,
        });
      }
      // General error handling for server issues
      return res.status(500).json({
        message: "Internal server error",
        error: (error as Error).message,
      });
    }
  }
}
