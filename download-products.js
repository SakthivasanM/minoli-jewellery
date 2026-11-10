const https = require('https');
const fs = require('fs');
const path = require('path');

const productImages = [
  // 1. MN-101: Aadhya Royal Polki Choker Set
  { file: 'public/images/products/mn-101-1.jpg', id: 'photo-1599643478518-a784e5dc4c8f' },
  { file: 'public/images/products/mn-101-2.jpg', id: 'photo-1601121141461-9d6647bca1ed' },

  // 2. MN-102: Miraaya Chandbali Earrings
  { file: 'public/images/products/mn-102-1.jpg', id: 'photo-1630019852942-f89202989a59' },
  { file: 'public/images/products/mn-102-2.jpg', id: 'photo-1635767798638-3e25273a8236' },

  // 3. MN-103: Tara Solitaire Cushion Halo Ring
  { file: 'public/images/products/mn-103-1.jpg', id: 'photo-1605100804763-247f67b3557e' },
  { file: 'public/images/products/mn-103-2.jpg', id: 'photo-1603561591411-07134e71a2a9' },

  // 4. MN-104: Kalyani Antique Temple Kada
  { file: 'public/images/products/mn-104-1.jpg', id: 'photo-1601121141461-9d6647bca1ed' },
  { file: 'public/images/products/mn-104-2.jpg', id: 'photo-1515562141207-7a88fb7ce338' },

  // 5. MN-105: Celeste Diamond Link Tennis Bracelet
  { file: 'public/images/products/mn-105-1.jpg', id: 'photo-1573408301185-9146fe634ad0' },
  { file: 'public/images/products/mn-105-2.jpg', id: 'photo-1599643477877-530eb83abc8e' },

  // 6. MN-106: Rajkumari Bridal Rani Haar & Choker Set
  { file: 'public/images/products/mn-106-1.jpg', id: 'photo-1588880331179-bc9b93a8cb5e' },
  { file: 'public/images/products/mn-106-2.jpg', id: 'photo-1535632066927-ab7c9ab60908' },

  // 7. MN-107: Ananya Meenakari Floral Jhumkas
  { file: 'public/images/products/mn-107-1.jpg', id: 'photo-1629224316810-9d8805b95e76' },
  { file: 'public/images/products/mn-107-2.jpg', id: 'photo-1635767798638-3e25273a8236' },

  // 8. MN-108: Serena Dainty Dewdrop Gold Pendant
  { file: 'public/images/products/mn-108-1.jpg', id: 'photo-1535632787350-4e68ef0ac584' },
  { file: 'public/images/products/mn-108-2.jpg', id: 'photo-1599643477877-530eb83abc8e' },

  // 9. MN-109: Nandini Polki Emerald Statement Ring
  { file: 'public/images/products/mn-109-1.jpg', id: 'photo-1602751584552-8ba73aad10e1' },
  { file: 'public/images/products/mn-109-2.jpg', id: 'photo-1603561591411-07134e71a2a9' },

  // 10. MN-110: Vanya Heritage Hasli Necklace
  { file: 'public/images/products/mn-110-1.jpg', id: 'photo-1617038260897-41a1f14a8ca0' },
  { file: 'public/images/products/mn-110-2.jpg', id: 'photo-1515562141207-7a88fb7ce338' },

  // 11. MN-111: Ira Layered Pearl & Gold Satellite Chain
  { file: 'public/images/products/mn-111-1.jpg', id: 'photo-1599643477877-530eb83abc8e' },
  { file: 'public/images/products/mn-111-2.jpg', id: 'photo-1535632787350-4e68ef0ac584' },

  // 12. MN-112: Suhana Polki Floral Studs
  { file: 'public/images/products/mn-112-1.jpg', id: 'photo-1588444837495-c6cfeb53f32d' },
  { file: 'public/images/products/mn-112-2.jpg', id: 'photo-1598560917505-59a3ad559071' },

  // 13. MN-113: Padmavati Jadau Nath & Mathapatti Set
  { file: 'public/images/products/mn-113-1.jpg', id: 'photo-1535632066927-ab7c9ab60908' },
  { file: 'public/images/products/mn-113-2.jpg', id: 'photo-1588880331179-bc9b93a8cb5e' },

  // 14. MN-114: Riddhi Temple Choodi Bangle Pair
  { file: 'public/images/products/mn-114-1.jpg', id: 'photo-1615655406736-b37c4fabf923' },
  { file: 'public/images/products/mn-114-2.jpg', id: 'photo-1601121141461-9d6647bca1ed' },

  // 15. MN-115: Maya Baguette Eternity Band
  { file: 'public/images/products/mn-115-1.jpg', id: 'photo-1606760227091-3dd870d97f1d' },
  { file: 'public/images/products/mn-115-2.jpg', id: 'photo-1605100804763-247f67b3557e' },

  // 16. MN-116: Aurelia Minimalist Snake Chain Necklace
  { file: 'public/images/products/mn-116-1.jpg', id: 'photo-1608042314453-ae338d80c427' },
  { file: 'public/images/products/mn-116-2.jpg', id: 'photo-1599643477877-530eb83abc8e' },

  // 17. MN-117: Devangana Grand Navratna Choker
  { file: 'public/images/products/mn-117-1.jpg', id: 'photo-1506630448388-4e683c67ddb0' },
  { file: 'public/images/products/mn-117-2.jpg', id: 'photo-1515562141207-7a88fb7ce338' },

  // 18. MN-118: Noor Emerald & Polki Chandelier Drops
  { file: 'public/images/products/mn-118-1.jpg', id: 'photo-1574717024653-61fd2cf4d44d' },
  { file: 'public/images/products/mn-118-2.jpg', id: 'photo-1630019852942-f89202989a59' },

  // 19. MN-119: Zoya Evil Eye Beaded Charm Bracelet
  { file: 'public/images/products/mn-119-1.jpg', id: 'photo-1617038220319-276d3cfab638' },
  { file: 'public/images/products/mn-119-2.jpg', id: 'photo-1573408301185-9146fe634ad0' },

  // 20. MN-120: Kripa Peacock Heritage Bridal Armlet (Bajuband)
  { file: 'public/images/products/mn-120-1.jpg', id: 'photo-1584308666744-24d5c474f2ae' },
  { file: 'public/images/products/mn-120-2.jpg', id: 'photo-1515562141207-7a88fb7ce338' },

  // 21. MN-121: Sitara Chunky Fluted Gold Dome Ring
  { file: 'public/images/products/mn-121-1.jpg', id: 'photo-1603561591411-07134e71a2a9' },
  { file: 'public/images/products/mn-121-2.jpg', id: 'photo-1605100804763-247f67b3557e' },

  // 22. MN-122: Rukmini Guttapusalu Heritage Necklace
  { file: 'public/images/products/mn-122-1.jpg', id: 'photo-1596944924616-7b38e7cfac36' },
  { file: 'public/images/products/mn-122-2.jpg', id: 'photo-1535632066927-ab7c9ab60908' },

  // 23. MN-123: Sia Classic Gold Twist Huggie Hoops
  { file: 'public/images/products/mn-123-1.jpg', id: 'photo-1598560917505-59a3ad559071' },
  { file: 'public/images/products/mn-123-2.jpg', id: 'photo-1588444837495-c6cfeb53f32d' },

  // 24. MN-124: Alia Baguette & Solitaire Dual Cuff
  { file: 'public/images/products/mn-124-1.jpg', id: 'photo-1573408301185-9146fe634ad0' },
  { file: 'public/images/products/mn-124-2.jpg', id: 'photo-1617038220319-276d3cfab638' },
];

function download(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return download(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) return reject(new Error('HTTP ' + res.statusCode));
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => file.close(resolve));
    }).on('error', reject);
  });
}

(async () => {
  console.log(`Downloading ${productImages.length} dedicated product images...`);
  let success = 0;
  for (const item of productImages) {
    const url = `https://images.unsplash.com/${item.id}?auto=format&fit=crop&w=800&q=80`;
    try {
      await download(url, item.file);
      success++;
      console.log(`[${success}/${productImages.length}] Downloaded ${item.file}`);
    } catch (e) {
      console.error(`Failed ${item.file}:`, e.message);
    }
  }
  console.log(`\nFinished! Successfully downloaded ${success}/${productImages.length} product images.`);
})();
