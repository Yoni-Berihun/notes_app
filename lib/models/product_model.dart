class Product {
  final int? id;
  final String title;
  final String description;
  final double? price; // Optional if it's a note app, but following "Product" structure
  final String? imageUrl;
  final int? ownerId;

  Product({
    this.id,
    required this.title,
    required this.description,
    this.price,
    this.imageUrl,
    this.ownerId,
  });

  factory Product.fromJson(Map<String, dynamic> json) {
    return Product(
      id: json['id'],
      title: json['title'] ?? '',
      description: json['description'] ?? '',
      price: json['price'] != null ? (json['price'] as num).toDouble() : null,
      imageUrl: json['image_url'],
      ownerId: json['owner_id'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'title': title,
      'description': description,
      'price': price,
      'image_url': imageUrl,
      'owner_id': ownerId,
    };
  }
}
