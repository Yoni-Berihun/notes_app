class Order {
  final int? id;
  final int productId;
  final int quantity;
  final String status;

  Order({
    this.id,
    required this.productId,
    required this.quantity,
    required this.status,
  });

  factory Order.fromJson(Map<String, dynamic> json) {
    return Order(
      id: json['id'],
      productId: json['product_id'],
      quantity: json['quantity'] ?? 1,
      status: json['status'] ?? 'pending',
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'product_id': productId,
      'quantity': quantity,
      'status': status,
    };
  }
}
