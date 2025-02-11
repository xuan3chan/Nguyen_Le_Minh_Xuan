import { Router } from "express";
import { UserController } from "../controller/user.controller";
import { body, param } from "express-validator";
import { handleValidationErrors } from "../middleware/validation-handle.midd"; // Import middleware

const router: Router = Router();
const userController = new UserController();

// Route to create a new user
router.post(
  "/create-user",
  [
    body("fullName").notEmpty().withMessage("Full name is required"), // Validation for full name
    body("email").isEmail().withMessage("Email is not valid"), // Validation for email format
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password should be at least 6 characters long"), // Validation for password length
  ],
  handleValidationErrors, // Middleware to handle validation errors
  userController.createUserController // Call controller method to create user
);

// Route to list users with filters
router.get("/list-user", userController.listUserController); // Route to get list of users

// Route to get details of a user
router.get(
  "/get-user/:id",
  [
    param("id")
      .notEmpty()
      .withMessage("User ID is required") // Validation for user ID presence
      .isMongoId()
      .withMessage("User ID must be a valid MongoID"), // Validation for valid MongoID format
  ],
  handleValidationErrors, // Middleware to handle validation errors
  userController.getUserController // Call controller method to get user details
);

// Route to update user details
router.put(
  "/update-user/:id",
  [
    param("id")
      .notEmpty()
      .withMessage("User ID is required") // Validation for user ID presence
      .isMongoId()
      .withMessage("User ID must be a valid MongoID"), // Validation for valid MongoID format
    body("fullName").optional(), // Optional validation for full name
    body("email").optional().isEmail().withMessage("Email is not valid"), // Optional email validation
    body("password")
      .optional()
      .isLength({ min: 6 })
      .withMessage("Password should be at least 6 characters long"), // Optional password length validation
  ],
  handleValidationErrors, // Middleware to handle validation errors
  userController.updateUserController // Call controller method to update user
);

router.delete(
    "/delete-user/:id",
    [
        param("id")
        .notEmpty()
        .withMessage("User ID is required") // Validation for user ID presence
        .isMongoId()
        .withMessage("User ID must be a valid MongoID"), // Validation for valid MongoID format
    ],
    handleValidationErrors, // Middleware to handle validation errors
    userController.deleteUserController // Call controller method to delete user
    );
export default router;
