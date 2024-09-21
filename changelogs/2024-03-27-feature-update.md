## Feature Update (March 27, 2024)

- Implemented email verification functionality
- Added forgot and reset password functionality
- Improved Google OAuth support
  - Set username after Google OAuth login (Google provides full name with spaces)
- Enhanced error handling
  - Handle duplicate email/username errors
  - Notify users if a username already exists
- Removed requirement for email verification (temporary change)