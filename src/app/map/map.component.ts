import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['../map/map.component.scss']
})
export class MapComponent implements OnInit{
  ngOnInit(): void {
    const countryPaths = document.querySelectorAll<SVGPathElement>('path');

    countryPaths.forEach(CountryInfo => {
      CountryInfo.addEventListener('mouseover', () => this.handleMouseOver(CountryInfo));
      CountryInfo.addEventListener('mouseleave', () => this.handleMouseLeave(CountryInfo));
      CountryInfo.addEventListener('click', () => this.loadCountryInfo(CountryInfo));
    });
  }

  async loadCountryInfo(CountryInfo: SVGPathElement) {
    try {
      const api = `https://api.worldbank.org/V2/country/${CountryInfo.id}?format=json`;
      const data = await (await fetch(api)).json();
      const dataPath = data[1];

      this.updateElement('name', dataPath[0].name);
      this.updateElement('capital', dataPath[0].capitalCity);
      this.updateElement('region', dataPath[0].region.value);
      this.updateElement('income', dataPath[0].incomeLevel.value);
      this.updateElement('longitude', dataPath[0].longitude);
      this.updateElement('latitude', dataPath[0].latitude);

    } catch (error) {
      console.error('Error:', error);
    }
  }

  private handleMouseOver(CountryInfo: SVGPathElement) {
    this.setPathFillColor(CountryInfo, '#00ff00');
  }

  private handleMouseLeave(CountryInfo: SVGPathElement) {
    this.setPathFillColor(CountryInfo, '');
  }

  private setPathFillColor(path: SVGPathElement, color: string) {
    path.style.fill = color;
  }

  private updateElement(id: string, value: string) {
    const element = document.getElementById(id);
    if (element) {
      element.innerText = value;
    }
  }
}
