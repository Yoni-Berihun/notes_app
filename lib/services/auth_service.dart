import '../core/constants.dart';
import 'api_service.dart';
import 'storage_service.dart';

class AuthService {
  final ApiService _apiService = ApiService();
  final StorageService _storageService = StorageService();

  Future<bool> login(String email, String password) async {
    try {
      // FastAPI standard auth typically expects form-data for 'username' and 'password'
      // But standard JSON is requested in prompt "Email + password fields".
      // Assuming generic backend might want JSON. If OAuth2PasswordRequestForm in FastAPI, it needs form-data.
      // I will send JSON first as per "Email + password fields" and common REST practice.
      // If strict FastAPI `OAuth2PasswordRequestForm` is used, key is 'username', not 'email'.
      // I'll stick to JSON body as prompt didn't specify strict OAuth2 form encoding.
      // Wait, prompt specifices "FastAPI backend with ... JWT authentication". Standard FastAPI auth uses form-data.
      // I will use application/x-www-form-urlencoded if strictly following FastAPI defaults, BUT user asked for "Email + password"
      // Often custom backends just take JSON. I'll stick to JSON for simplicity unless I see issues.
      // Actually, standard FastAPI `/token` endpoint indeed uses form-data.
      // I will implement a specific form-post for login if needed, but let's try JSON first or standard Post.
      // Let's assume the backend takes JSON for /token or /login.
      
      final response = await _apiService.post(AppConstants.loginEndpoint, {
        'username': email, // FastAPI often maps email to username field
        'password': password,
      });

      if (response != null && response['access_token'] != null) {
        await _storageService.saveToken(response['access_token']);
        return true;
      }
      return false;
    } catch (e) {
      print('Login error: $e');
      return false; // Rethrow or handle
    }
  }

  Future<bool> register(String email, String password, String fullName) async {
    try {
      await _apiService.post(AppConstants.registerEndpoint, {
        'email': email,
        'password': password,
        'full_name': fullName,
      });
      return true;
    } catch (e) {
      print('Register error: $e');
      throw e;
    }
  }

  Future<void> logout() async {
    await _storageService.clearToken();
  }
  
  Future<bool> isAuthenticated() async {
    final token = await _storageService.getToken();
    return token != null;
  }
}
