# 🚀 Next.js + MUI + Redux Dashboard Project Guide

මෙම ලේඛනය මඟින් අප විසින් නිර්මාණය කරන ලද Frontend ව්‍යාපෘතියේ තාක්ෂණයන්, භාවිතා කළ ක්‍රමවේද සහ එක් එක් ගොනුවේ (file) කාර්යභාරය පිළිබඳව සවිස්තරාත්මකව පැහැදිලි කරයි.

---

## 1. Material UI (MUI) යනු කුමක්ද?

**Material UI (MUI)** යනු React සඳහා භාවිතා කරන ඉතා ජනප්‍රිය UI (User Interface) Component Library එකකි. එය Google සමාගමේ "Material Design" සංකල්ප මත පදනම් වී නිර්මාණය කර ඇත.

- **වාසි:** අපට මුල සිටම බොත්තම් (Buttons), පෙළ ඇතුළත් කරන කොටස් (TextFields), මෙනු (Drawers) ආදිය නිර්මාණය කිරීමට අවශ්‍ය නොවේ. MUI මඟින් ඉතා අලංකාර, Responsive සහ පහසුවෙන් වෙනස් කළ හැකි (customizable) components ලබා දෙයි.
- **අපගේ ව්‍යාපෘතියේ:** අපි අලංකාර පෙනුමක් ලබා දීම සඳහා MUI හි `Box`, `Grid`, `Paper`, `TextField`, සහ `Button` වැනි අංග භාවිතා කළෙමු. එසේම `sx` prop එක හරහා අමතර මෝස්තර (gradients, blur effects) එකතු කරන ලදී.

---

## 2. Atomic Design Pattern යනු කුමක්ද?

**Atomic Design Pattern** යනු ඉතා ක්‍රමානුකූලව User Interface එකක් ගොඩනැගීමේ ක්‍රමවේදයකි. මෙහිදී සම්පූර්ණ පිටුවක් එකවර ලියනවා වෙනුවට, එය කුඩා කොටස් වලට කඩා නිර්මාණය කරයි. මෙහි ප්‍රධාන කොටස් 5ක් ඇත:

1. **Atoms (පරමාණු):** UI එකක කුඩාම කොටස් වේ. තනිවම වෙනත් කිසිවකට බෙදිය නොහැක. (උදා: `Button`, `Input`, `Icon`).
2. **Molecules (අණු):** පරමාණු (Atoms) කිහිපයක් එකතු වී සෑදෙන කුඩා කොටස්. (උදා: Icon එකක් සහ Text එකක් සහිත `StatCard` එකක්).
3. **Organisms (ඉන්ද්‍රියයන්/පද්ධති):** අණු (Molecules) සහ පරමාණු එකතු වී සෑදෙන සංකීර්ණ කොටස්. මෙහි යම්තාක් දුරකට ක්‍රියාකාරීත්වයක් ඇත. (උදා: `Header`, `Sidebar`).
4. **Templates (සැකිලි):** ඉහත කොටස් එකතු කර සාදා ගන්නා පිටුවක මූලික සැකිල්ල. මෙහි සැබෑ දත්ත (real data) නොමැත, ඇත්තේ layout එක පමණි.
5. **Pages (පිටු):** Templates වලට සත්‍ය දත්ත (Redux හරහා) ලබා දී පරිශීලකයාට පෙන්වන අවසන් පිටුව. (උදා: `DashboardPage`).

---

## 3. ඔබට සිදු කිරීමට තිබූ වෙනස (The Refactoring Process)

**ගැටළුව:** මුලින් ඔබ Dashboard එකේ සහ Sign Up/In පිටු වල සියලුම කේත (UI Elements, Styles, Redux Logic, Routing) එකම `page.tsx` ගොනුවක ලියා තිබුණි. මෙය "Monolithic" ක්‍රමයයි. මෙලෙස ලිවීමෙන් අනාගතයේදී කේතය තේරුම් ගැනීමට සහ වෙනස්කම් කිරීමට ඉතා අපහසු වේ.

**විසඳුම:** අපි එම විශාල කේතය Atomic Design ක්‍රමවේදයට අනුව කුඩා ගොනු වලට වෙන් කළෙමු.

- ඔබ සංඛ්‍යා පෙන්වන කොටස් `StatCard` (Molecule) ලෙසද, ප්‍රධාන මෙනුව `Header` (Organism) ලෙසද, පසෙකින් ඇති මෙනුව `Sidebar` (Organism) ලෙසද වෙන් කළා.
- අවසානයේදී ඔබේ `DashboardPage` එක ඉතා පිරිසිදු විය. එය දැන් කරන්නේ Redux මඟින් දත්ත ලබා ගෙන එම දත්ත අදාළ කුඩා components වලට ලබා දීම පමණි.

---

## 4. එක් එක් ගොනුවේ (File) කාර්යභාරය

අපගේ ව්‍යාපෘතියේ ෆෝල්ඩර ව්‍යුහය (Folder Structure) සහ ගොනු වල කාර්යයන් පහත පරිදි වේ:

### 🗄️ දත්ත සහ සේවාවන් (Data & Services)

- **`src/data/users.ts`**: ව්‍යාපෘතියේ සැබෑ Backend එකක් (Database) නොමැති නිසා, පරිශීලකයින්ගේ (Users) විස්තර ගබඩා කර ඇත්තේ මෙම ගොනුවේ ඇති Array එකකය.
- **`src/services/auth.service.ts`**: මෙය සත්‍ය API එකක් ලෙස ක්‍රියා කරයි. මෙහි `login` සහ `register` Functions ඇත. `delay` එකක් භාවිතයෙන් සත්‍ය අන්තර්ජාල සම්බන්ධතාවක් ලෙස කාලය ගතවීම (800ms) මෙහිදී අනුකරණය (simulate) කර ඇත.

### 🧠 තත්ත්ව කළමනාකරණය (Redux Store & Features)

- **`src/features/auth/authSlice.ts`**: පරිශීලකයා ලොග් වී සිටිනවාද (isAuthenticated), ඔහුගේ විස්තර මොනවාද යන්න මතක තබා ගන්නේ මෙතැනිනි. API Service එකට කතා කර දත්ත ලබා ගැනීමට `createAsyncThunk` භාවිතා කර ඇත.
- **`src/store/store.ts`**: මුළු යෙදුමේම දත්ත ගබඩාව (Global State) මෙයයි.
- **`src/store/hooks.ts`**: React Components වලට Redux දත්ත ලබා ගැනීමට සහ Actions යැවීමට (dispatch) අවශ්‍ය Typescript සහිත `useAppSelector` සහ `useAppDispatch` සකසා ඇත.
- **`src/store/Provider.tsx`**: Next.js App Router හි Redux සහ MUI භාවිතා කිරීම සඳහා අවශ්‍ය Client-side wrapper එකකි.

### 🏗️ Atomic UI Components

**Atoms:**

- **`src/atoms/AuthInput.tsx`**: Sign In සහ Sign Up පිටු වල භාවිතා කළ අලංකාර Input Field එකයි.
- **`src/atoms/PrimaryButton.tsx`**: විශේෂ Gradient වර්ණ සහිත ප්‍රධාන බොත්තමයි.

**Molecules:**

- **`src/molecules/StatCard.tsx`**: Dashboard එකේ Total Users, Active Sessions වැනි දත්ත පෙන්වීමට භාවිතා කළ කුඩා කාඩ්පතයි. මෙයට Icon එකක් සහ අගයක් (value) පිටතින් ලබා දිය හැක.

**Organisms:**

- **`src/organisms/Header.tsx`**: Dashboard හි ඉහළින්ම ඇති මෙනු තීරුව. මෙහි පරිශීලකයාගේ නම සහ Logout බොත්තම ඇත.
- **`src/organisms/Sidebar.tsx`**: වම් පසින් ඇති ප්‍රධාන Navigation මෙනුව.
- **`src/organisms/ProtectedRoute/ProtectedRoute.tsx`**: ඉතා වැදගත් ගොනුවකි! ලොග් නොවූ (Unauthenticated) කෙනෙක් Dashboard එකට යාමට උත්සාහ කළහොත්, ඔහුව බලහත්කාරයෙන් නැවත `/signin` පිටුවට හරවා යවන්නේ (Redirect) මෙම Component එක මඟිනි.

**Templates:**

- **`src/templates/DashboardTemplate.tsx`**: Header එක සහ Sidebar එක නියමිත ස්ථාන වල තබා, මැද කොටසේ (Main Content Area) අපට අවශ්‍ය දේවල් පෙන්වීමට සකසා ඇති මූලික සැකිල්ලයි.

### 📄 ප්‍රධාන පිටු (Pages / Routing)

- **`src/app/layout.tsx`**: මුළු වෙබ් අඩවියේම ප්‍රධාන HTML ව්‍යුහයයි. අපගේ Redux සහ MUI Providers සියල්ලම ඇතුළත් කර ඇත්තේ මෙහි ය.
- **`src/app/signin/page.tsx`**: ලොග් වීමේ පිටුව. මෙහිදී `react-hook-form` සහ `yup` භාවිතා කර පරිශීලකයා නිවැරදිව දත්ත ඇතුළත් කර ඇත්දැයි පරීක්ෂා (Validation) කරයි.
- **`src/app/signup/page.tsx`**: නව ගිණුමක් සෑදීමේ පිටුව.
- **`src/app/dashboard/page.tsx`**: සියලුම Atomic Components (Header, Sidebar, StatCards) එකතු කර සම්පූර්ණ Dashboard එක නිර්මාණය කරන අවසන් පිටුවයි. මෙහිදී Redux හි ඇති දත්ත (user details) ලබාගෙන ඒවා UI එකට යවයි.
