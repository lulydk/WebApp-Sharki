Vue.component('navbar', {
    template: `
    <ul class="navbar">
        <li><div class="navbar-button">Logo</div></li>
        <li><a class="active navbar-button" href="#home">Sharki</a></li>
        <li><form><div class="search-container">
    
                <input type="text" placeholder="Busca entrenadores o rutinas" name="search">
                <button type="submit"><i class="fa fa-search"></i></button>
    
        </div></form></li>
        <li><a class="navbar-button" href="#contact">Rutinas</a></li>
        <li><a class="navbar-button" href="#about">Crear una rutina</a></li>
        <li><div class="navbar-button">Perfil</div></li>
        <li><a class="navbar-button" href="#contact">Idioma</a></li>
    </ul>
  `
})