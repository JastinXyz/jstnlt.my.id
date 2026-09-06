# Cara minta frame karakter baru

Panduan buat generate pose baru di ChatGPT atau model gambar lain, di sesi mana pun,
tanpa harus mengulang semua kesalahan yang sudah kita bayar.

Penjelasannya Indonesia, prompt-nya Inggris. Jangan diterjemahkan, model gambar jauh
lebih patuh ke instruksi Inggris.

---

## Aturan dasar

1. **Satu pose, satu sesi.** Jangan minta dua pose sekaligus dan jangan menumpuk banyak
   koreksi dalam satu pesan. Waktu dikasih delapan koreksi wajah sekaligus, model
   menerapkan semuanya berlebihan dan mukanya jadi tirus dengan kuping mencuat.
2. **Bedakan generate dan edit.**
   - Pose baru: lampirkan `public/char/hero.png`, pakai kerangka **A** di bawah.
   - Membetulkan hasil yang sudah hampir benar: lampirkan **hasil itu sendiri**, bukan
     `hero.png`, pakai kerangka **B**. Kalau `hero.png` ikut dilampirkan waktu mengedit,
     model malah menggambar ulang dari nol dan posenya hilang.
3. **Sebut patokan yang tidak bisa kebalik.** "Lengan kanan" selalu ditafsirkan terbalik,
   entah dari sudut pandang siapa. Yang berhasil: "lengan yang ada lima bunganya", "sisi
   yang sama dengan laptop", "tangan yang di saku pada gambar referensi".
4. **Latar harus transparan, dan sebut juga tanpa cahaya.** Pernah kejadian hasilnya
   transparan tapi ada halo terang menempel di sekeliling badan, 14 ribu piksel. Di latar
   hitam tidak kelihatan, di situs yang kertasnya terang jadi kabut abu.
5. **Ukuran dan sudut pandang harus dikunci.** Tinggi ubun-ubun ke sol, kamera lurus depan
   setinggi mata, seluruh badan, tanpa zoom, tanpa cermin. Selisih kecil masih bisa
   dibetulkan di sini, tapi kalau sudutnya berubah tidak ada yang bisa ditolong.

---

## Kerangka A, pose baru

Lampirkan `public/char/hero.png`. Ganti bagian dalam kurung siku.

```
The attached image is a character illustration. Generate the SAME character in a
different pose.

KEEP IDENTICAL, this is the hard requirement:
- Same art style, same line weight, same flat cel shading, same palette.
- Same outfit: white long-sleeve crewneck with the black text
  "SENT TO ME FROM HEAVEN / YOU'RE MY WORLD" on the chest, light-wash blue baggy
  jeans, white sneakers.
- Exactly five yellow flower motifs in one evenly spaced vertical row down the
  OUTER edge of one sleeve, on the same arm as in the reference, each one clipped
  by the sleeve outline the way a print wrapping around an arm would be. Five, and
  none anywhere else on the garment.
- Same face, same hair, same skin tone, same proportions, same body height.
- Same camera: straight-on front view, eye level, full body head to shoes. No
  perspective change, no zoom change, no mirroring.
- Fully transparent background. No shadow, no ground, no glow, no light halo
  around the figure, no frame, no text labels.
- Portrait canvas, figure centred, same head-to-shoe height as the reference.

THE POSE:
[jelaskan posenya. Sebut kedua lengan, kedua kaki, arah kepala, dan arah mata.]

Expression: [ekspresinya, dan matanya melihat ke mana.]
```

Kalau pose itu menekuk lengan yang berbunga, lebih aman motifnya dihilangkan saja dari
awal: ganti butir bunga di atas dengan `Both sleeves stay PLAIN WHITE with no print,
no flowers and no pattern of any kind.` Motif di lengan tertekuk selalu berantakan, dan
di web pun cuma kelihatan dua tiga bunga.

## Kerangka B, membetulkan hasil

Lampirkan gambar yang mau dibetulkan saja.

```
The attached image is a character illustration I need one small correction on.

Keep everything exactly as it is: same pose, same hands, same face, same stance,
same clothes, same colours, same line work, same canvas size and position. Do not
redraw the character, do not mirror, do not shift him.

Fix one thing only: [satu hal saja, sebut kondisi sekarang dan kondisi yang benar.]

Everything else stays untouched.
```

---

## Jebakan yang sudah terbukti

| Gejala | Sebab | Cara menghindari |
| --- | --- | --- |
| Laptopnya jadi seperti tablet | Laptop tertutup dipegang mendatar | Minta laptop **terbuka bentuk L**, punggung lid menghadap kita, logo Apple di punggung lid, layar menghadap dia. Sebut "two planes meeting at a hinge, not one flat slab" |
| Teks dada ketutup | Barang dipegang setinggi dada | Suruh dipegang setinggi pinggang, dan sebut "both lines of the chest text stay fully visible" |
| Bunga pindah lengan | Kata "kanan" atau "kiri" | Sebut patokan yang tidak bisa kebalik, dan lampirkan foto bajunya kalau perlu |
| Bunga di tengah lengan | Model menaruhnya di bidang terlebar | Sebut **outer edge**, dan sebut bahwa tiap bunga kepotong garis lengan |
| Jumlah bunga salah | Tidak pernah disebut | Selalu tulis angkanya, lima, dan tulis "none anywhere else" |
| Halo terang di sekeliling badan | Model menambah cahaya latar | Sebut "no glow, no light halo around the figure" |
| Wajahnya beda tipis | Generate baru selalu menggambar ulang wajah | Tidak bisa dicegah lewat prompt. Dibetulkan di sini dengan cangkok kepala |

---

## Setelah filenya jadi

Simpan mentahnya di `public/char/` dengan nama `pose-<sesuatu>.png`, jangan ditimpa ke
file lama, lalu bilang. Yang dikerjakan di sini, semuanya otomatis lewat Pillow:

1. Buang halo, kalau ada.
2. Cocokkan palet kulit dan jeans ke `hero.png`, dikali per kanal, diulang sampai
   mediannya sama.
3. Bersihkan motif yang salah kalau lebih murah dihapus daripada digenerate ulang.
4. Skalakan supaya tinggi figurnya sama dengan frame lain, lalu sejajarkan lewat pusat
   kepala dan sol sepatu.
5. Ekspor ke kanvas bersama, `frame-<nama>.webp`.

Detail teknis dan alasan tiap langkah ada di bagian **The character** di `CLAUDE.md`.
