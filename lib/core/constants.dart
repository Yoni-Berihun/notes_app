class AppConstants {
  static const String baseUrl = 'http://127.0.0.1:8000'; // Placeholder for FastAPI backend
  // Use http://10.0.2.2:8000 for Android emulator if localhost doesn't work directly

  static const String loginEndpoint = '$baseUrl/token'; // Standard OAuth2 endpoint often used in FastAPI
  static const String registerEndpoint = '$baseUrl/users/register'; // Hypothetical
  static const String postsEndpoint = '$baseUrl/items';
  static const String usersEndpoint = '$baseUrl/users';
  static const String profileEndpoint = '$baseUrl/users/me';
}
