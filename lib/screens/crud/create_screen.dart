import 'package:flutter/material.dart';
import '../../models/product_model.dart';
import '../../services/api_service.dart';
import '../../widgets/custom_app_bar.dart';
import '../../widgets/custom_button.dart';
import '../../widgets/input_field.dart';
import '../../core/constants.dart';

class CreateScreen extends StatefulWidget {
  final Product? product; // If provided, we are in update mode

  const CreateScreen({super.key, this.product});

  @override
  State<CreateScreen> createState() => _CreateScreenState();
}

class _CreateScreenState extends State<CreateScreen> {
  final _formKey = GlobalKey<FormState>();
  late TextEditingController _titleController;
  late TextEditingController _descriptionController;
  final ApiService _apiService = ApiService();
  bool _isLoading = false;

  @override
  void initState() {
    super.initState();
    _titleController = TextEditingController(text: widget.product?.title ?? '');
    _descriptionController = TextEditingController(text: widget.product?.description ?? '');
  }

  Future<void> _submit() async {
    if (_formKey.currentState!.validate()) {
      setState(() => _isLoading = true);
      try {
        final data = {
          'title': _titleController.text,
          'description': _descriptionController.text,
        };

        if (widget.product == null) {
          // Create
          await _apiService.post(AppConstants.postsEndpoint, data);
          if (mounted) {
            ScaffoldMessenger.of(context).showSnackBar(
              const SnackBar(content: Text('Created successfully')),
            );
            // If pushed, pop. If tab, maybe clear form or logic handled by parent?
            // Since this is used as a Tab in home_screen but also potentially pushed for Edit.
            // If it's a Tab, pop won't work nicely. But "Update" usually comes from Detail, which pushes this screen.
            // "Create" comes from Tab.
            // If widget.product is null, we are likely in the Tab (or pushed via FAB).
            // Logic: if can pop, pop.
            if (Navigator.canPop(context)) {
               Navigator.pop(context, true); // Return true to signal refresh
            } else {
               // In Tab, maybe just clear
               _titleController.clear();
               _descriptionController.clear();
               // And show snackbar
            }
          }
        } else {
          // Update
          final url = '${AppConstants.postsEndpoint}/${widget.product!.id}';
          await _apiService.patch(url, data);
          if (mounted) {
            ScaffoldMessenger.of(context).showSnackBar(
              const SnackBar(content: Text('Updated successfully')),
            );
            Navigator.pop(context, true);
          }
        }
      } catch (e) {
        if (mounted) {
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(content: Text('Error: $e')),
          );
        }
      } finally {
        if (mounted) {
          setState(() => _isLoading = false);
        }
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    final isEditing = widget.product != null;
    return Scaffold(
      appBar: CustomAppBar(
        title: isEditing ? 'Edit Note' : 'Create Note',
        automaticallyImplyLeading: isEditing, // Show back button only if editing (pushed)
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Form(
          key: _formKey,
          child: Column(
            children: [
              InputField(
                label: 'Title',
                controller: _titleController,
                validator: (v) => v!.isEmpty ? 'Required' : null,
              ),
              const SizedBox(height: 16),
              InputField(
                label: 'Description',
                controller: _descriptionController,
                maxLines: 5,
                validator: (v) => v!.isEmpty ? 'Required' : null,
              ),
              const SizedBox(height: 32),
              CustomButton(
                text: isEditing ? 'Update' : 'Create',
                onPressed: _submit,
                isLoading: _isLoading,
              ),
            ],
          ),
        ),
      ),
    );
  }
}
