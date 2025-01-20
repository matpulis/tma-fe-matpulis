import { Component } from '@angular/core';
import { ContainerComponent } from "../../components/layout/container/container.component";

@Component({
  selector: 'app-faqs',
  imports: [ContainerComponent],
  templateUrl: './faqs.component.html',
})
export class FaqsComponent {
  faqs = [
    {
      "question": "What are your shipping options and delivery times?",
      "answer": "We offer standard and express shipping. Delivery times vary by location: standard shipping takes 5–7 business days, and express shipping takes 1–3 business days."
    },
    {
      "question": "Do you ship internationally? If so, what are the costs?",
      "answer": "Yes, we ship internationally! Shipping costs depend on the destination and shipping method selected during checkout. Check our Shipping Page for detailed rates."
    },
    {
      "question": "What payment methods do you accept?",
      "answer": "We accept major credit/debit cards (Visa, MasterCard, American Express), PayPal, Apple Pay, and Google Pay."
    },
    {
      "question": "How can I track my order?",
      "answer": "Once your order is shipped, you will receive a tracking link via email. You can also track your order through your account on our website."
    },
    {
      "question": "Do you offer gift cards or vouchers?",
      "answer": "Yes, we offer digital gift cards in various denominations. They can be purchased directly on our website and emailed to the recipient."
    },
    {
      "question": "How do I find the right size?",
      "answer": "Check our size guide, available on each product page. For additional help, feel free to contact our customer service team."
    },
    {
      "question": "Do you provide a size guide for your products?",
      "answer": "Yes, we provide a detailed size guide for each item. You’ll find it linked on every product page."
    },
    {
      "question": "Are the colors of the clothes the same as shown in the photos?",
      "answer": "We strive to represent our products as accurately as possible. However, slight variations may occur due to lighting or screen settings."
    },
    {
      "question": "What materials are used for your clothing?",
      "answer": "Each product description includes details about the materials used. We prioritize high-quality fabrics for comfort and durability."
    },
    {
      "question": "Are your products sustainable or eco-friendly?",
      "answer": "Many of our products are made from sustainable materials, such as organic cotton or recycled fabrics. Look for the “Sustainable” badge on product pages."
    },
    {
      "question": "Can I modify or cancel my order after it’s been placed?",
      "answer": "Orders can be modified or canceled within 1 hour of placement. After this, they are processed for shipping. Contact us immediately for assistance."
    },
    {
      "question": "What is your return and exchange policy?",
      "answer": "We accept returns and exchanges within 30 days of delivery, provided the items are unworn, unwashed, and in original packaging. Sale items are non-refundable."
    },
    {
      "question": "How do I initiate a return or exchange?",
      "answer": "Visit our Returns Center to start the process. You’ll need your order number and email address to proceed."
    },
    {
      "question": "What should I do if I receive a damaged or incorrect item?",
      "answer": "Please contact our customer service team with your order number and photos of the issue. We’ll arrange a replacement or refund promptly."
    },
    {
      "question": "Do I need to pay for return shipping?",
      "answer": "For domestic orders, return shipping is free. For international returns, customers are responsible for the shipping costs."
    },
    {
      "question": "How can I use a discount code?",
      "answer": "Enter your discount code at checkout in the 'Promo Code' box, and the discount will be applied to your total."
    },
    {
      "question": "Do you offer any discounts for first-time shoppers?",
      "answer": "Yes! First-time shoppers can sign up for our newsletter to receive a 10% discount on their first order."
    },
    {
      "question": "Do you have a loyalty or rewards program?",
      "answer": "Absolutely! Join our rewards program to earn points for every purchase, which can be redeemed for discounts on future orders."
    },
    {
      "question": "How can I contact customer service if I have an issue?",
      "answer": "You can reach our customer service team via email at support@example.com or through our live chat available on our website."
    },
    {
      "question": "What are your customer service hours?",
      "answer": "Our customer support is available Monday to Friday, 9 AM to 6 PM (local time)."
    }
  ]
}
