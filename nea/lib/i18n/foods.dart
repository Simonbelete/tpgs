import 'package:nea/models/food_model.dart';
import 'egg/all.dart' as egg;

Map<String, Map<String, Food>> foodData = {
  'egg': {
    'en': egg.EN,
  },
};

Map<String, Map<String, Food>> carbohydratesFood = {
  'Banana': {
    'en':
        Food(coverImage: "assets/materials/foods/banana.png", title: "Banana"),
    'sw': Food(coverImage: "assets/materials/foods/banana.png", title: "Ndizi"),
    'am': Food(coverImage: "assets/materials/foods/banana.png", title: "ሙዝ")
  },
  'Teff-Grain': {
    'en': Food(
        coverImage: "assets/materials/foods/Teff-Grain.jpg", title: "Teff"),
    'sw': Food(
        coverImage: "assets/materials/foods/Teff-Grain.jpg", title: "Teff"),
    'am': Food(coverImage: "assets/materials/foods/Teff-Grain.jpg", title: "ጤፍ")
  },
  'Corn': {
    'en': Food(coverImage: "assets/materials/foods/corn.png", title: "Corn"),
    'sw': Food(coverImage: "assets/materials/foods/corn.png", title: "Mahindi"),
    'am': Food(coverImage: "assets/materials/foods/corn.png", title: "በቆሎ")
  },
  'Bread': {
    'en': Food(coverImage: "assets/materials/foods/bread.png", title: "Bread"),
    'sw': Food(coverImage: "assets/materials/foods/bread.png", title: "Mkate"),
    'am': Food(coverImage: "assets/materials/foods/bread.png", title: "ዳቦ")
  },
  'Beans': {
    'en': Food(coverImage: "assets/materials/foods/beans.png", title: "Beans"),
    'sw':
        Food(coverImage: "assets/materials/foods/beans.png", title: "Maharage"),
    'am': Food(coverImage: "assets/materials/foods/beans.png", title: "ባቄላ")
  },
  'potatoes': {
    'en': Food(
        coverImage: "assets/materials/foods/potatoes.png", title: "Potatoes"),
    'sw':
        Food(coverImage: "assets/materials/foods/potatoes.png", title: "Viazi"),
    'am': Food(coverImage: "assets/materials/foods/potatoes.png", title: "ድንች")
  }
};

Map<String, Map<String, Food>> vitaminsFood = {
  'Carrot': {
    'en': Food(coverImage: "assets/materials/foods/carot.png", title: "Carrot"),
    'sw': Food(coverImage: "assets/materials/foods/carot.png", title: "Karoti"),
    'am': Food(coverImage: "assets/materials/foods/carot.png", title: "ካሮት"),
  },
  'Tomato': {
    'en':
        Food(coverImage: "assets/materials/foods/tomato.png", title: "Tomato"),
    'sw':
        Food(coverImage: "assets/materials/foods/tomato.png", title: "Nyanya"),
    'am': Food(coverImage: "assets/materials/foods/tomato.png", title: "ቲማቲም")
  },
  'Watermelon': {
    'en': Food(
        coverImage: "assets/materials/foods/watermelon.png",
        title: "Watermelon"),
    'sw': Food(
        coverImage: "assets/materials/foods/watermelon.png",
        title: "Tikiti maji"),
    'am':
        Food(coverImage: "assets/materials/foods/watermelon.png", title: "ሐብሐብ")
  },
  'Avocado': {
    'en': Food(
        coverImage: "assets/materials/foods/avocado.png", title: "Avocado"),
    'sw': Food(
        coverImage: "assets/materials/foods/avocado.png", title: "Parachichi"),
    'am': Food(coverImage: "assets/materials/foods/avocado.png", title: "አቮካዶ")
  },
  'Banana': {
    'en':
        Food(coverImage: "assets/materials/foods/banana.png", title: "Banana"),
    'sw': Food(coverImage: "assets/materials/foods/banana.png", title: "Ndizi"),
    'am': Food(coverImage: "assets/materials/foods/banana.png", title: "ሙዝ")
  },
  'Orange': {
    'en':
        Food(coverImage: "assets/materials/foods/orange.png", title: "Orange"),
    'sw':
        Food(coverImage: "assets/materials/foods/orange.png", title: "Chungwa"),
    'am': Food(coverImage: "assets/materials/foods/orange.png", title: "ብርቱካን")
  },
  'Pumpkin': {
    'en': Food(
        coverImage: "assets/materials/foods/pumpkin.png", title: "Pumpkin"),
    'sw': Food(
        coverImage: "assets/materials/foods/pumpkin.png", title: "Malenge"),
    'am': Food(coverImage: "assets/materials/foods/pumpkin.png", title: "ዱባ")
  }
};

Map<String, Map<String, Food>> proteinsFood = {
  'Meat': {
    'en': Food(coverImage: "assets/materials/foods/raw_meat.png", title: "Meat")
  },
  'Fish': {
    'en': Food(coverImage: "assets/materials/foods/fish.png", title: "Fish")
  },
  'Egg': {
    'en': Food(coverImage: "assets/materials/foods/egg.png", title: "Egg")
  },
  'Milk': {
    'en': Food(coverImage: "assets/materials/foods/milk.png", title: "Milk")
  },
  'Yogurt': {
    'en': Food(
        coverImage: "assets/materials/foods/yogurt_food.png", title: "Yogurt")
  },
  'Chicken': {
    'en': Food(
        coverImage: "assets/materials/foods/raw_chicken.png", title: "Chicken")
  },
};

Map<String, Map<String, Food>> fatsFood = {
  'Cookingoil': {
    'en': Food(
        coverImage: "assets/materials/foods/vegetable_oil.png",
        title: "Cooking oil"),
    'sw': Food(
        coverImage: "assets/materials/foods/vegetable_oil.png",
        title: "Mafuta ya kupikia"),
    'am': Food(
        coverImage: "assets/materials/foods/vegetable_oil.png",
        title: "የማብሰያ ዘይት")
  },
  'Egg': {
    'en': Food(coverImage: "assets/materials/foods/egg.png", title: "Egg"),
    'sw': Food(coverImage: "assets/materials/foods/egg.png", title: "Yai"),
    'am': Food(coverImage: "assets/materials/foods/egg.png", title: "እንቁላል")
  },
  'Avocado': {
    'en': Food(
        coverImage: "assets/materials/foods/avocado.png", title: "Avocado"),
    'sw': Food(
        coverImage: "assets/materials/foods/avocado.png", title: "Parachichi"),
    'am': Food(coverImage: "assets/materials/foods/avocado.png", title: "አቮካዶ")
  },
  'Milk': {
    'en': Food(coverImage: "assets/materials/foods/milk.png", title: "Milk"),
    'sw': Food(coverImage: "assets/materials/foods/milk.png", title: "Maziwa"),
    'am': Food(coverImage: "assets/materials/foods/milk.png", title: "ወተት")
  },
  'Fish': {
    'en': Food(coverImage: "assets/materials/foods/fish.png", title: "Fish"),
    'sw': Food(coverImage: "assets/materials/foods/fish.png", title: "Samaki"),
    'am': Food(coverImage: "assets/materials/foods/fish.png", title: "ዓሳ")
  }
};

Map<String, Map<String, Food>> mineralsFood = {
  'Carrot': {
    'en': Food(coverImage: "assets/materials/foods/carot.png", title: "Carrot"),
    'sw': Food(coverImage: "assets/materials/foods/carot.png", title: "Karoti"),
    'am': Food(coverImage: "assets/materials/foods/carot.png", title: "ካሮት")
  },
  'Tomato': {
    'en':
        Food(coverImage: "assets/materials/foods/tomato.png", title: "Tomato"),
    'sw':
        Food(coverImage: "assets/materials/foods/tomato.png", title: "Nyanya"),
    'am': Food(coverImage: "assets/materials/foods/tomato.png", title: "ቲማቲም")
  },
  'Avocado': {
    'en': Food(
        coverImage: "assets/materials/foods/avocado.png", title: "Avocado"),
    'sw': Food(
        coverImage: "assets/materials/foods/avocado.png", title: "Parachichi"),
    'am': Food(coverImage: "assets/materials/foods/avocado.png", title: "አቮካዶ")
  },
  'Watermelon': {
    'en': Food(
        coverImage: "assets/materials/foods/watermelon.png",
        title: "Watermelon"),
    'sw': Food(
        coverImage: "assets/materials/foods/watermelon.png",
        title: "Tikiti maji"),
    'am':
        Food(coverImage: "assets/materials/foods/watermelon.png", title: "ሐብሐብ")
  },
  'Banana': {
    'en':
        Food(coverImage: "assets/materials/foods/banana.png", title: "Banana"),
    'sw': Food(coverImage: "assets/materials/foods/banana.png", title: "Ndizi"),
    'am': Food(coverImage: "assets/materials/foods/banana.png", title: "ሙዝ")
  },
  'Orange': {
    'en':
        Food(coverImage: "assets/materials/foods/orange.png", title: "Orange"),
    'sw':
        Food(coverImage: "assets/materials/foods/orange.png", title: "Chungwa"),
    'am': Food(coverImage: "assets/materials/foods/orange.png", title: "ብርቱካን")
  },
  'Pumpkin': {
    'en': Food(
        coverImage: "assets/materials/foods/pumpkin.png", title: "Pumpkin"),
    'sw': Food(
        coverImage: "assets/materials/foods/pumpkin.png", title: "Malenge"),
    'am': Food(coverImage: "assets/materials/foods/pumpkin.png", title: "ዱባ")
  }
};
