import React, { useEffect } from 'react';


const ThemeToggler = () => {
  const colors = ['#006D77', '#caf23f', '#FCA311', '#bb008c', '#81d3b4', '#f62c57'];

  useEffect(() => {
    const themeToggler = document.querySelector('.theme-toggler');
    const toggleBtn = document.querySelector('.toggle-btn');

    toggleBtn.onclick = () => {
      themeToggler.classList.toggle('active');
    };

    document.querySelectorAll('.theme-toggler .theme-btn').forEach((btn) => {
      btn.onclick = () => {
        const color = btn.style.background;
        document.querySelector(':root').style.setProperty('--main-color', color);
      };
    });
  }, []);

  return (
    <div>
    <div className="theme-toggler">
      <div className="toggle-btn">
        <i className="fas fa-cog"></i>
      </div>

      <h3>Choose color</h3>

      <div className="buttons">
        {colors.map((color, index) => (
          <div
            key={index}
            className="theme-btn"
            style={{ background: color }}
          ></div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default ThemeToggler;
