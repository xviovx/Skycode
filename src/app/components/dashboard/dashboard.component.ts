import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  // initialize charts on component load
  ngOnInit(): void {
    this.createCharts();
  }

  // create both pie and bar charts
  private createCharts(): void {
    // fetch login attempt data from local storage
    const loginAttempts = JSON.parse(localStorage.getItem('loginAttempts') || '{"success": 0, "failed": 0}');

    // create individual charts
    this.createPieChart(loginAttempts);
    this.createBarChart(loginAttempts);
  }

  // create a pie chart for login attempts
  private createPieChart(loginAttempts: any): void {
    // get canvas element for pie chart
    const ctx = document.getElementById('pieChart') as HTMLCanvasElement;

    if (ctx) {
      // configure and render pie chart
      new Chart(ctx, {
        type: 'pie',
        data: {
          labels: ['Successful Logins', 'Failed Logins'],
          datasets: [{
            label: 'Login Attempts',
            data: [loginAttempts.success, loginAttempts.failed],
            backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(255, 99, 132, 0.2)'],
            borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false
        }
      });
    } else {
      console.error('Canvas element with id "pieChart" not found.');
    }
  }

  // create a bar chart for login attempts
  private createBarChart(loginAttempts: any): void {
    // get canvas element for bar chart
    const ctx = document.getElementById('barChart') as HTMLCanvasElement;

    if (ctx) {
      // configure and render bar chart
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Successful Logins', 'Failed Logins'],
          datasets: [{
            label: 'Login Attempts',
            data: [loginAttempts.success, loginAttempts.failed],
            backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(255, 99, 132, 0.2)'],
            borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: { beginAtZero: true }
          }
        }
      });
    } else {
      console.error('Canvas element with id "barChart" not found.');
    }
  }
}
