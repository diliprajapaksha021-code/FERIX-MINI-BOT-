# 🤖 FERIX MINI WhatsApp Bot

<div align="center">

![WhatsApp Bot](https://img.shields.io/badge/WhatsApp-Bot-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-20.x-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)
![Version](https://img.shields.io/badge/Version-1.0.0-green?style=for-the-badge)

**ඔබගේ WhatsApp එක සඳහා සම්පූර්ණ බොට් එකක් - නොමිලේ, විවෘත මූලාශ්‍ර**

[📚 Documentation](#-විධාන) • [🚀 Quick Start](#-quick-start-විනාඩි-5න්-ආරම්භ-කරන්න) • [💬 Support](#-සහාය)

</div>

---

## ✨ විශේෂාංග

| විශේෂාංගය | විස්තරය |
|------------|----------|
| 🤖 **ස්වයංක්‍රීය ප්‍රතිචාර** | පණිවිඩ වලට ස්වයංක්‍රීයව පිළිතුරු |
| 📋 **විධාන පද්ධතිය** | පහසු prefix එකක් සහිත commands (.menu, .alive) |
| 👥 **කණ්ඩායම් සහාය** | Groups සහ private chats දෙකටම වැඩ කරයි |
| 🔄 **සැසි කළමනාකරණය** | QR code එක වරක් පමණක් scan කරන්න |
| ⚡ **වේගවත් ප්‍රතිචාර** | අඩු latency, වේගවත් පිළිතුරු |
| 🆓 **සම්පූර්ණයෙන් නොමිලේ** | කිසිදු ගෙවීමක් අවශ්‍ය නොවේ |
| 🔧 **පහසුවෙන් වෙනස් කළ හැකි** | ඔබට අවශ්‍ය පරිදි modify කරන්න |

---

## 📋 විධාන

| විධානය | විස්තරය | උදාහරණය |
|---------|----------|-----------|
| `.menu` | සියලුම විධාන පෙන්වයි | `.menu` |
| `.alive` | බොට් එකේ තත්වය පරීක්ෂා කරයි | `.alive` |
| `.ping` | ප්‍රතිචාර කාලය පරීක්ෂා කරයි | `.ping` |
| `.time` | ශ්‍රී ලංකා වේලාව පෙන්වයි | `.time` |
| `.help` | සහාය පණිවිඩය පෙන්වයි | `.help` |

> **සටහන:** prefix එක `.` ලෙස සකසා ඇත. ඔබට `config.js` එකේදී වෙනස් කළ හැක.

---

## 🚀 Quick Start (විනාඩි 5න් ආරම්භ කරන්න)

### පියවර 1: අවශ්‍ය මෘදුකාංග

- [Node.js](https://nodejs.org/) (v20 හෝ ඊට වැඩි)
- [Git](https://git-scm.com/)
- WhatsApp සක්‍රිය ගිණුමක්

### පියවර 2: ස්ථාපනය

```bash
# Repository එක clone කරන්න
git clone https://github.com/ඔයාගේ-නම/bot-එකේ-නම.git
cd bot-එකේ-නම

# අවශ්‍ය packages install කරන්න
npm install

# Bot එක start කරන්න
npm start
