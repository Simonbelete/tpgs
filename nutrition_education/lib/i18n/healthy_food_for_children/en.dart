import 'package:flutter/material.dart';
import 'package:nutrition_education/model/course_model.dart';
import 'package:nutrition_education/widgets/bullet.dart';
import 'package:nutrition_education/widgets/course_body_image.dart';
import 'package:nutrition_education/widgets/paragraph.dart';
import 'package:nutrition_education/widgets/sub_title_text.dart';

Course EN = Course(
  coverImage: 'assets/materials/school_children.png',
  title: 'Healthy food for school-aged children',
  body: Column(crossAxisAlignment: CrossAxisAlignment.start, children: const [
    Paragraph(
        title: '',
        body:
            'Healthy food for school-age children includes a wide variety of fresh foods from the five food groups:- '),
    Bullet(children: [
      'Vegetables',
      'fruit',
      'grain foods',
      'reduced-fat dairy',
      'protein.'
    ]),
    SubTitleText(text: 'Fruit and vegetables'),
    Paragraph(
        title: '',
        body:
            'Fruit and vegetables give your child energy, vitamins, antioxidants, fiber, and water. These nutrients help to protect your child from diseases later in life, including diseases like heart disease, stroke, and some cancers. Encourage your child to choose fruit and vegetables for every meal and snack. This includes fruit and vegies of different colors, textures, and tastes, both fresh and cooked. Wash fruit to remove dirt or chemicals and leave any edible skin on because the skin contains nutrients too.'),
    CourseBodyImage(image: 'assets/materials/fruit_and_vegi.jpg'),
    SubTitleText(text: 'Grain foods'),
    Paragraph(
        title: '',
        body:
            'Grain foods include bread, pasta, noodles, breakfast cereals, couscous, rice, corn, quinoa, polenta, oats, and barley. These foods give children the energy they need to grow, develop, and learn.Grain foods with a low glycaemic index, like wholegrain pasta and bread, will give your child longer-lasting energy and keep them fuller.'),
    CourseBodyImage(image: 'assets/materials/grain_food.jpg'),
    SubTitleText(text: 'Reduced-fat dairy foods'),
    Paragraph(
        title: '',
        body:
            'Essential dairy foods are milk, cheese, and yogurt. These foods are good sources of protein and calcium. Try to offer your child different kinds of dairy daily for example, milk drinks, cheese slices, or yogurt bowls.  Children aged over two years can have reduced-fat dairy products.'),
    CourseBodyImage(image: 'assets/materials/reduced_fats.jpg'),
    SubTitleText(text: 'Protein'),
    Paragraph(
        title: '',
        body:
            'Protein-rich foods include lean meat, fish, chicken, eggs, beans, lentils, chickpeas, tofu, and nuts. These foods are essential for your child’s growth and muscle development. These foods contain other valuable vitamins and minerals like iron, zinc, vitamin B12, and omega-3 fatty acids. Iron and omega-3 fatty acids from red meat and oily fish are essential for your child\'s brain development and learning.'),
    CourseBodyImage(image: 'assets/materials/protin_food.jpg'),
    SubTitleText(text: 'Brian boosting foods for school children'),
    CourseBodyImage(image: 'assets/materials/egg.png'),
    Paragraph(
        title: 'Eggs ',
        body:
            'Whole eggs are an excellent source of brain-boosting vitamins A, D, B12, and choline. Choline is essential for young children, as it has been shown to improve brain development and long-term memory. It is recommended buying pastured eggs: One study found that pastured eggs can have twice as much vitamin E and almost three times as many omega-3s as caged eggs. '),
    CourseBodyImage(image: 'assets/materials/safefood_food.jpg'),
    Paragraph(
        title: 'Seafood ',
        body:
            'Oily fish and other seafood provide a lot of bang for the buck regarding brain development protein, zinc, iron, choline, iodine, and omega-3 fats. But avoid feeding your toddler seafood high in mercury, such as tuna and swordfish. Too much mercury can harm a child\'s developing nervous system. Instead, opt for low-mercury options such as shrimp, salmon, tilapia, crab, or cod. Children under age 3 can have a 1-ounce serving two to three times a week.'),
    CourseBodyImage(image: 'assets/materials/leafy_green_food.jpg'),
    Paragraph(
        title: 'Leafy Green Vegetables ',
        body:
            'There\'s a reason that parents try to hide extra leafy greens, such as spinach and kale, in their children’s smoothies and pasta sauce: They’re a great source of iron and folate. Research shows that children who get enough folate tend to have better cognition than kids who don’t get enough. Iron plays an important role in the development of the hippocampus — the part of the brain responsible for learning and memory.'),
    CourseBodyImage(image: 'assets/materials/meat_food.jpg'),
    Paragraph(
        title: 'Lean beef (Meat alternative) ',
        body:
            'Lean beef qualifies as brain food because it is an excellent source of zinc and iron. Iron is especially vital for young children because they are more likely to experience anemia (low iron levels). Nearly one in 10 American children aged 3 and younger has an iron deficiency, which can contribute to learning difficulties and attention deficit hyperactivity disorder (ADHD). Black bean or soy burgers work as great iron-containing burger substitutes.'),
    CourseBodyImage(image: 'assets/materials/nuts_food.jpg'),
    Paragraph(
        title: 'Nuts & seeds ',
        body:
            'Nuts, seeds, and nut butter make a protein- and zinc-packed snack. Protein contributes to healthy brain growth and the development of long-term memory. Zinc also plays a vital role during the toddler years when the brain is growing rapidly. Insufficient amounts of zinc may affect your child’s cognitive development, impairing their memory and ability to learn.'),
    CourseBodyImage(image: 'assets/materials/yogurt_food.jpg'),
    Paragraph(
        title: 'Yogurt ',
        body:
            'Unsweetened yogurt is an easy, kid-friendly way to support brain growth. It contains nutrients such as protein, zinc, choline, and iodine. Children need iodine to produce thyroid hormones, vital to brain development and neurological processes. Even mild iodine deficiency may affect a child’s overall cognitive function and ability to reason.'),
    CourseBodyImage(image: 'assets/materials/beans_food.jpg'),
    Paragraph(
        title: 'Beans ',
        body:
            'offer several beneficial nutrients for a developing brain, including zinc, protein, iron, folate, and choline. Some types of beans, such as kidney, pinto, and soybeans, also contain high amounts of omega-3 fatty acids. For vegetarian children, the iron and protein in beans make them an excellent meat substitute.'),
    SubTitleText(text: 'Critical Nutrients for baby brain development'),
    Paragraph(
        title: '',
        body:
            'While all nutrients are essential for brain growth and functioning, some play a more significant role in early brain development than others. The American Academy of Pediatrics Committee on Nutrition recommends certain nutrients for healthy brain development in toddlers: '),
    Bullet(children: [
      'Choline',
      'Folate',
      'Iodine',
      'Iron',
      'Long-chain polyunsaturated fatty acids, such as omega-3 fatty acids',
      'Protein',
      'Vitamins A, D, B6, and B12',
      'Zinc',
    ])
  ]),
);
