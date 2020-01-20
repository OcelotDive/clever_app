import { Component, OnInit } from '@angular/core';
import { InvestorService } from '../services/investor.service';
import { AfterViewInit, ElementRef, ViewChild } from '@angular/core';
declare var google: any;


@Component({
  selector: 'reportChart',
  template: `
  <main class="mainPageReport">
  <div class="tabsInvestorPage colFlex">
  <img class="logoImage" src="assets/cleverNB.png" />
    <div class="chart" #customChart style="width: 700px; height: 500px;">
    </div>
    <button class="btn btn-info reportBackButton" routerLink="/investorList" routerLinkActive="active">Back to Investor List</button>
    <button class="btn btn-warning" #pie (click)="drawChartOnClick(pie.value)" value="Pie">Pie</button>
    <button class="btn btn-warning" #scatter (click)="drawChartOnClick(scatter.value)" value="Scatter">Scatter</button>
    <button class="btn btn-warning" #bar (click)="drawChartOnClick(bar.value)" value="Bar">Bar</button>
    <button class="btn btn-warning" #area (click)="drawChartOnClick(area.value)" value="Area">Area</button>
  </div>
</main>
 `
  ,
  providers: [InvestorService]
})

export class ReportComponent {
  bond: number = 0;
  isa: number = 0;
  gia: number = 0;
  pension: number = 0;
  other: number = 0;

  constructor(private investorService: InvestorService) {

    this.investorService.getTotalAccounts().subscribe(accountsResponse => {
      accountsResponse.map((account: {
        type: string;amountHeld: number;dateCreated: string
      }) => {

        switch (account.type) {
          case "Bond":
            this.bond += Math.floor(account.amountHeld);
            break;
          case "GIA":
            this.gia += Math.floor(account.amountHeld);
            break;
          case "ISA":
            this.isa += Math.floor(account.amountHeld);
            break;
          case "Pension":
            this.pension += Math.floor(account.amountHeld);
            break;
          default:
            this.other += Math.floor(account.amountHeld);
            break;
        }
      })

    })

  }

  @ViewChild('customChart') customChart: ElementRef

  drawPieChart = () => {

    const options = {
      title: 'Amount held by account type GBP',
      titleTextStyle: {
        fontSize: 18, 
        bold: true,      
    },
      legend: {
        position: 'bottom'
      },
      is3D: true,
      animation: {
        startup: true,
        duration: 10000,
        easing: 'out'
      },
    };

    const pieChart = new google.visualization.PieChart(this.customChart.nativeElement);

    setTimeout(() => {
      const data = google.visualization.arrayToDataTable([
      ['Task', 'Amount held per account'],
      ['Bond', this.bond],
      ['GIA', this.gia],
      ['ISA', this.isa],
      ['Pension', this.pension],
      ['Other', this.other]
    ]);
      pieChart.draw(data, options);
    }, 1500)
  }

  drawScatterChart = () => {

    const options = {
      title: 'Amount held by account type GBP',
      titleTextStyle: {
        fontSize: 18, 
        bold: true,      
    },
      legend: {
        position: 'bottom'
      },
      series: {
        0: {
          color: '#e2431e'
        }
      },
      is3D: true,
      animation: {
        startup: true,
        duration: 5000,
        easing: 'out'
      },
    };

    const scatterChart = new google.visualization.ScatterChart(this.customChart.nativeElement);

    setTimeout(() => {
      const data = google.visualization.arrayToDataTable([
    ['Task', 'Amount held per account'],
    ['Bond', this.bond],
    ['GIA', this.gia],
    ['ISA', this.isa],
    ['Pension', this.pension],
    ['Other', this.other]
  ]);
      scatterChart.draw(data, options);
    }, 1500)
  }

  drawBarChart = () => {

    const options = {
      title: 'Amount held by account type GBP',
      titleTextStyle: {
        fontSize: 18, 
        bold: true,      
    },
      legend: {
        position: 'bottom'
      },
      is3D: true,
      animation: {
        startup: true,
        duration: 5000,
        easing: 'out'
      },
    };

    const BarChart = new google.visualization.BarChart(this.customChart.nativeElement);

    setTimeout(() => {
      const data = google.visualization.arrayToDataTable([
    ['Task', 'Amount held per account'],
    ['Bond', this.bond],
    ['GIA', this.gia],
    ['ISA', this.isa],
    ['Pension', this.pension],
    ['Other', this.other]
  ]);
      BarChart.draw(data, options);
    }, 1500)
  }

  drawSteppedAreaChart = () => {

    const options = {
      title: 'Amount held by account type GBP',
      titleTextStyle: {
        fontSize: 18, 
        bold: true,      
    },
      legend: {
        position: 'bottom'
      },
      is3D: true,
      animation: {
        startup: true,
        duration: 5000,
        easing: 'out'
      },

    };

    const SteppedAreaChart = new google.visualization.SteppedAreaChart(this.customChart.nativeElement);

    setTimeout(() => {
      const data = google.visualization.arrayToDataTable([
    ['Account', 'Amount 000s'],
    ['Bond', this.bond],
    ['GIA', this.gia],
    ['ISA', this.isa],
    ['Pension', this.pension],
    ['Other', this.other]
  ]);
      SteppedAreaChart.draw(data, options);
    }, 1500)
  }

  ngAfterViewInit() {
    google.charts.load('current', {
      'packages': ['corechart']
    });
    google.charts.setOnLoadCallback(this.drawPieChart);
  }

  drawChartOnClick(buttonValue: string) {
    switch (buttonValue) {
      case "Pie":
        google.charts.load('current', {
          'packages': ['corechart']
        });
        google.charts.setOnLoadCallback(this.drawPieChart);

        break;
      case "Scatter":
        google.charts.load('current', {
          'packages': ['corechart']
        });
        google.charts.setOnLoadCallback(this.drawScatterChart);
        break;
      case "Bar":
        google.charts.load('current', {
          'packages': ['corechart']
        });
        google.charts.setOnLoadCallback(this.drawBarChart);
        break;
      case "Area":
        google.charts.load('current', {
          'packages': ['corechart']
        });
        google.charts.setOnLoadCallback(this.drawSteppedAreaChart);
        break;
      default:
        google.charts.load('current', {
          'packages': ['corechart']
        });
        google.charts.setOnLoadCallback(this.drawPieChart);
        break;

    }

  }
}
