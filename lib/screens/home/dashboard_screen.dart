import 'package:flutter/material.dart';
import '../../models/product_model.dart';
import '../../services/api_service.dart';
import '../../core/constants.dart';
import '../../widgets/loading_widget.dart';
import '../crud/detail_screen.dart';

class DashboardScreen extends StatefulWidget {
  const DashboardScreen({super.key});

  @override
  State<DashboardScreen> createState() => _DashboardScreenState();
}

class _DashboardScreenState extends State<DashboardScreen> {
  final ApiService _apiService = ApiService();
  late Future<List<Product>> _productsFuture;

  @override
  void initState() {
    super.initState();
    _loadData();
  }

  void _loadData() {
    setState(() {
      _productsFuture = _fetchProducts();
    });
  }

  Future<List<Product>> _fetchProducts() async {
    // Assuming backend returns a list of items
    final response = await _apiService.get(AppConstants.postsEndpoint);
    if (response is List) {
      return response.map((json) => Product.fromJson(json)).toList();
    } else {
      return [];
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: FutureBuilder<List<Product>>(
        future: _productsFuture,
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const LoadingWidget();
          } else if (snapshot.hasError) {
            return Center(child: Text('Error: ${snapshot.error}'));
          } else if (!snapshot.hasData || snapshot.data!.isEmpty) {
            return const Center(child: Text('No items found.'));
          }

          final products = snapshot.data!;
          return RefreshIndicator(
            onRefresh: () async => _loadData(),
            child: ListView.builder(
              padding: const EdgeInsets.all(16),
              itemCount: products.length,
              itemBuilder: (context, index) {
                final product = products[index];
                return Card(
                  child: ListTile(
                    leading: CircleAvatar(
                      child: Text(product.title.isNotEmpty ? product.title[0].toUpperCase() : '?'),
                    ),
                    title: Text(product.title, maxLines: 1, overflow: TextOverflow.ellipsis),
                    subtitle: Text(product.description, maxLines: 2, overflow: TextOverflow.ellipsis),
                    onTap: () async {
                      // Navigate to details
                      // Can pass product or fetch detail
                      await Navigator.push(
                        context,
                        MaterialPageRoute(
                          builder: (context) => DetailScreen(product: product),
                        ),
                      );
                      _loadData(); // Refresh on return
                    },
                  ),
                );
              },
            ),
          );
        },
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          // Trigger create action from Home Screen parent or navigate here
          // Since BottomNav controls tabs, we can't easily switch tab programmatically without provider/callback
          // But user asked for FAB for Create here.
          // I will assume FAB navigates to Create Screen directly if not using "Create" tab for it.
          // Or if Create Tab exists, maybe FAB shouldn't be here.
          // Prompt: "FloatingActionButton for Create" in Home/Dashboard section.
          // Prompt also: "Bottom navigation (Home, Create, Profile)".
          // Typically if Create is a Bottom Tab, you don't need FAB.
          // But maybe Create Tab is "My Operations" and FAB is "Quick Add".
          // I'll make FAB navigate to CreateScreen (which enters CRUD flow).
          Navigator.pushNamed(context, '/create'); 
        },
        child: const Icon(Icons.add),
      ),
    );
  }
}
