// [id, name, category, price, mrp, emoji, description]
const CATS={"dry-food":["Dry food","🥣"],"wet-food":["Wet food","🥫"],jackets:["Jackets","🧥"],sweaters:["Sweaters","🧶"],beds:["Beds","🛏️"],toys:["Toys","🎾"],pharmacy:["Medicines","💊"],lifestyle:["Lifestyle","🎒"]};
const P=[
[1,"Chicken & Rice Adult Dry Food 3 kg","dry-food",899,999,"🥣","Complete daily nutrition for adult dogs with real chicken, rice and added omega-3."],
[2,"Puppy Starter Dry Food 1.5 kg","dry-food",649,699,"🐶","Small kibble with DHA for brain and bone growth in puppies up to 12 months."],
[3,"Large Breed Dry Food 10 kg","dry-food",2899,3199,"🥣","Joint-support formula with glucosamine for large and giant breeds."],
[4,"Grain-Free Lamb Dry Food 2 kg","dry-food",1299,1450,"🍖","Lamb and sweet potato recipe for sensitive stomachs."],
[5,"Pedigree PRO Experst Nutrition Active Adult(18 Months onwards)","dry-food",1099,1199,"🥣","Lower calories and higher fibre for dogs over seven years."],
[6,"Chicken Chunks in Gravy (12 pouches)","wet-food",720,799,"🥫","Soft chunks in gravy. Mix with kibble or serve alone."],
[7,"Beef & Veggie Loaf Can 400 g","wet-food",120,135,"🥫","A pâté-style loaf with carrots and peas, no artificial colours."],
[8,"Puppy Wet Food Tray (6 pack)","wet-food",450,499,"🍲","Easy-to-eat mousse texture for weaning puppies."],
[9,"Drools Real Chicken & Liver Chunks in Gravy Adult Dog","wet-food",75,85,"🐟","Fish recipe rich in omega-3 for a shiny coat."],
[10,"Waterproof Rain Jacket","jackets",1199,1499,"🧥","Lightweight, reflective trim, adjustable chest strap."],
[11,"Padded Winter Jacket","jackets",1599,1899,"🧥","Fleece-lined and windproof for cold Bengaluru mornings."],
[12,"Reflective Safety Vest","jackets",799,899,"🦺","High-visibility vest for evening walks."],
[13,"Cable-Knit Sweater","sweaters",899,999,"🧶","Soft acrylic knit with a stretchy neck. Sizes XS to XXL."],
[14,"Hooded Fleece Sweater","sweaters",1099,1299,"🧶","Warm hood and belly cover, machine washable."],
[15,"Festive Stripe Sweater","sweaters",799,899,"🎄","Bright stripes for festival photos and chilly nights."],
[16,"Orthopedic Memory Foam Bed","beds",3499,3999,"🛏️","Supports joints. Removable washable cover."],
[17,"Cozy Donut Cuddler Bed","beds",1799,1999,"🍩","Raised rim for dogs who love to curl up."],
[18,"Cooling Mat for Summer","beds",1299,1499,"❄️","Pressure-activated gel, no water or electricity."],
[19,"Travel Foldable Bed","beds",1499,1699,"🧳","Folds flat into a carry bag."],
[20,"Rubber Chew Ball","toys",249,299,"🎾","Tough natural rubber for strong chewers."],
[21,"Squeaky Plush Duck","toys",299,349,"🦆","Soft toy with a double-stitched squeaker."],
[22,"Rope Tug Toy","toys",199,249,"🪢","Cotton rope that also cleans teeth."],
[23,"Treat-Dispensing Puzzle","toys",599,699,"🧩","Keeps your dog busy and mentally active."],
[24,"Flea & Tick Spot-On (3 doses)","pharmacy",649,699,"💧","Protects for one month per dose. Choose by weight."],
[25,"Multivitamin Chews (60)","pharmacy",549,599,"💊","Daily vitamins for coat, bones and immunity."],
[26,"Deworming Tablet","pharmacy",99,110,"💊","Broad-spectrum. Use as advised by your vet."],
[27,"Antiseptic Wound Spray","pharmacy",249,279,"🩹","For minor cuts and scrapes."],
[28,"Ear Cleaning Solution","pharmacy",299,349,"👂","Gentle drops that remove wax and debris."],
[29,"Adjustable Padded Harness","lifestyle",899,999,"🦮","No-pull design with front and back clips."],
[30,"Leather Collar & Leash Set","lifestyle",1199,1399,"🦴","Handstitched leather with brass fittings."],
[31,"Stainless Steel Feeding Bowl","lifestyle",349,399,"🍽️","Non-slip base, dishwasher safe."],
[32,"Dog Travel Backpack","lifestyle",2499,2899,"🎒","Ventilated carrier for small dogs up to 6 kg."],
[33,"Oatmeal Shampoo 500 ml","lifestyle",449,499,"🧴","Soothes dry skin. Soap-free."],
[34,"Pet Grooming Brush","lifestyle",299,349,"🪮","Removes loose hair and tangles."]];
const PRODUCTS=P.map(([id,name,cat,price,mrp,emoji,desc])=>({id,name,cat,price,mrp,emoji,desc}));
PRODUCTS.forEach(p => {
  p.img = `images/${p.id}.png`;
  p.emoji = `<img src="${p.img}" alt="${p.name}" loading="lazy" style="width:100%;height:100%;object-fit:cover;display:block" onerror="this.replaceWith('${p.emoji}')">`;
});

// // Real photos (keyword-matched, hosted by loremflickr.com). Replace with your own product photos later.
// const KW={"dry-food":"dog,kibble","wet-food":"dog,food,bowl","jackets":"dog,jacket","sweaters":"dog,sweater","beds":"dog,bed","toys":"dog,toy","pharmacy":"dog,veterinary","lifestyle":"dog,leash"};
// const photo=(kw,seed,w=480,h=360)=>`https://loremflickr.com/${w}/${h}/${kw}?lock=${seed}`;
// PRODUCTS.forEach(p=>p.img=`images/${p.id}.jpg`);
// // Show the photo wherever the emoji was shown
// PRODUCTS.forEach(p=>p.emoji=`<img src="${p.img}" alt="${p.name}" class="product-photo">`);
