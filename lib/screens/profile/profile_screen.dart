import 'dart:io';
import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';
import '../../models/user_model.dart';
import '../../services/api_service.dart';
import '../../services/auth_service.dart';
import '../../core/constants.dart';
import '../../widgets/custom_button.dart';
import '../../widgets/input_field.dart';
import '../../widgets/loading_widget.dart';
import 'account_settings_screen.dart';

class ProfileScreen extends StatefulWidget {
  const ProfileScreen({super.key});

  @override
  State<ProfileScreen> createState() => _ProfileScreenState();
}

class _ProfileScreenState extends State<ProfileScreen> {
  final ApiService _apiService = ApiService();
  final AuthService _authService = AuthService();
  late Future<User> _userFuture;

  @override
  void initState() {
    super.initState();
    _loadUser();
  }

  void _loadUser() {
    setState(() {
      _userFuture = _fetchUser();
    });
  }

  Future<User> _fetchUser() async {
    final response = await _apiService.get(AppConstants.profileEndpoint);
    return User.fromJson(response);
  }

  Future<void> _logout() async {
    await _authService.logout();
    if (mounted) {
      Navigator.pushNamedAndRemoveUntil(context, '/login', (route) => false);
    }
  }

  Future<void> _uploadAvatar() async {
    final picker = ImagePicker();
    final pickedFile = await picker.pickImage(source: ImageSource.gallery);

    if (pickedFile != null) {
      try {
        await _apiService.postMultipart(
          '${AppConstants.usersEndpoint}/me/avatar', 
          File(pickedFile.path),
        );
        _loadUser(); // Refresh 
        if (mounted) {
           ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Avatar updated')));
        }
      } catch (e) {
        if (mounted) {
           ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('Upload failed: $e')));
        }
      }
    }
  }

  void _navigateToSettings(User user) async {
    final result = await Navigator.push(
      context,
      MaterialPageRoute(
        builder: (context) => AccountSettingsScreen(user: user),
      ),
    );
    if (result == true) {
      _loadUser();
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: FutureBuilder<User>(
        future: _userFuture,
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const LoadingWidget();
          } else if (snapshot.hasError) {
            return Center(child: Text('Error loading profile: ${snapshot.error}'));
          } else if (!snapshot.hasData) {
            return const Center(child: Text('User not found'));
          }

          final user = snapshot.data!;
          return Center(
            child: Padding(
              padding: const EdgeInsets.all(24.0),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                   GestureDetector(
                     onTap: _uploadAvatar,
                     child: CircleAvatar(
                       radius: 60,
                       backgroundImage: user.avatarUrl != null 
                         ? NetworkImage(user.avatarUrl!) 
                         : null,
                       child: user.avatarUrl == null 
                         ? const Icon(Icons.person, size: 60) 
                         : null,
                     ),
                   ),
                   const SizedBox(height: 8),
                   const Text('Tap to change avatar', style: TextStyle(fontSize: 12, color: Colors.grey)),
                   const SizedBox(height: 24),
                   Text(
                     user.fullName ?? 'No Name',
                     style: const TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
                   ),
                   const SizedBox(height: 8),
                   Text(
                     user.email,
                     style: const TextStyle(fontSize: 16, color: Colors.grey),
                   ),
                   const SizedBox(height: 48),
                   CustomButton(
                     text: 'Account Settings',
                     onPressed: () => _navigateToSettings(user),
                   ),
                   const SizedBox(height: 16),
                   CustomButton(
                     text: 'Logout',
                     onPressed: _logout,
                     backgroundColor: Colors.red,
                   ),
                ],
              ),
            ),
          );
        },
      ),
    );
  }
}
