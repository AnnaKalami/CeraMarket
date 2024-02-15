// return (
//     <div className="sign-in-container">
//       <div className="form-container">
//         <h1 className="auth-title">AuthPage</h1>
//         {error && <div className="auth-error">{error}</div>}
//         <form onSubmit={handleSubmit}>
//           <input
//             className="auth-input"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             type="text"
//             placeholder="email"
//             required
//           />
//           <input
//             className="auth-input"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             type="password"
//             placeholder="password"
//             required
//           />
//           <button className="auth-btn-submit" type="submit">
//             ВОЙТИ В IT
//           </button>
//         </form>
//         <div className="authRedirect">
//           Нет аккаунта?
//           <NavLink className="nav__link" to="/sign-up">
//             Регистрация
//           </NavLink>
//         </div>
//       </div>
//     </div>
//   );


//   return (
//     <div className="reg-container">
//       <h1>RegPage</h1>

//       <div className="errorForm">{error && <h6>{error}</h6>}</div>

//       <form className="sign-up-form" onSubmit={handleSubmit}>
//         <input
//           name="name"
//           value={name}
//           onChange={(e) => {
//             setName(e.target.value);
//           }}
//           type="text"
//           placeholder="name"
//           required
//         />
//         <input
//           name="email"
//           value={email}
//           onChange={handleEmailChange}
//           type="text"
//           placeholder="email"
//           required
//         />
//         <input
//           name="password"
//           value={password}
//           onChange={handlePasswordChange}
//           type="password"
//           placeholder="password"
//           required
//           minLength={8}
//         />
//         <input
//           name="rpassword"
//           value={rpassword}
//           onChange={handleConfirmPasswordChange}
//           type="password"
//           placeholder="repeat password"
//           required
//           minLength={8}
//         />
//         <input
//           className="img-input"
//           name="img"
//           onChange={(e) => {
//             handleFileChange(e);
//           }}
//           type="file"
//         />
//         <div className="checkbox-master">
//           <input
//             name="taskStatus"
//             id="taskStatus"
//             type="checkbox"
//             value={String(isMaster)}
//             onChange={() => setIsMaster(true)}
//           />
//           Master
//         </div>
//         <button type="submit">Зарегаться</button>
//         <div className="authRedirect">
//           У меня есть аккаунт
//           <NavLink className="nav__link" to="/sign-in">
//             Войти
//           </NavLink>
//         </div>
//       </form>
//     </div>
//   );
