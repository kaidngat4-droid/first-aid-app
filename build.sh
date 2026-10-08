#!/bin/bash
set -e
rm -rf www && mkdir www

# نسخ كل ملفات التطبيق بدون حذف أي شيء
for f in * ; do
  case "$f" in
    www|node_modules|android|package.json|package-lock.json|capacitor.config.json|build.sh) ;;
    *) cp -r "$f" www/ ;;
  esac
done

# نسخ المكتبات محليًا ليعمل التطبيق بدون إنترنت
mkdir -p www/libs/leaflet www/libs/tf www/libs/fonts
cp node_modules/leaflet/dist/leaflet.css node_modules/leaflet/dist/leaflet.js www/libs/leaflet/
cp -r node_modules/leaflet/dist/images www/libs/leaflet/
cp node_modules/@tensorflow/tfjs/dist/tf.min.js www/libs/tf/
cp node_modules/@tensorflow-models/mobilenet/dist/mobilenet.min.js www/libs/tf/
for f in cairo tajawal amiri; do cp -r node_modules/@fontsource/$f www/libs/fonts/$f; done

# تحويل روابط الإنترنت إلى روابط محلية (نفس المكتبات بنفس الإصدارات)
FONTS=""
for css in cairo/arabic-600 cairo/latin-600 cairo/arabic-900 cairo/latin-900 tajawal/arabic-400 tajawal/latin-400 tajawal/arabic-700 tajawal/latin-700 amiri/arabic-700 amiri/latin-700; do
  FONTS="$FONTS<link rel=\"stylesheet\" href=\"libs/fonts/${css%%/*}/${css##*/}.css\">"
done
sed -i "/fonts.googleapis.com\/css2/c\\$FONTS" www/index.html

sed -i 's|https://unpkg.com/leaflet@1.9.4/dist/leaflet.css|libs/leaflet/leaflet.css|; s|https://unpkg.com/leaflet@1.9.4/dist/leaflet.js|libs/leaflet/leaflet.js|; s|https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@4.15.0/dist/tf.min.js|libs/tf/tf.min.js|; s|https://cdn.jsdelivr.net/npm/@tensorflow-models/mobilenet@2.1.0/dist/mobilenet.min.js|libs/tf/mobilenet.min.js|' www/index.html

echo "OK: build done"
du -sh www
