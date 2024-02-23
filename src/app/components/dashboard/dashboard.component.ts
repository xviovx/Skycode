import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.createCharts();
  }

  private createCharts(): void {
    // Retrieve login attempt data
    const loginAttempts = JSON.parse(localStorage.getItem('loginAttempts') || '{"success": 0, "failed": 0}');

    this.createPieChart(loginAttempts);
    this.createBarChart(loginAttempts);
  }

  private createPieChart(loginAttempts: any): void {
    const ctx = document.getElementById('pieChart') as HTMLCanvasElement;

    if (ctx) {
      new Chart(ctx, {
        type: 'pie',
        data: {
          labels: ['Successful Logins', 'Failed Logins'],
          datasets: [{
            label: 'Login Attempts',
            data: [loginAttempts.success, loginAttempts.failed],
            backgroundColor: [
              'rgba(75, 192, 192, 0.2)',
              'rgba(255, 99, 132, 0.2)'
            ],
            borderColor: [
              'rgba(75, 192, 192, 1)',
              'rgba(255, 99, 132, 1)'
            ],
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

  private createBarChart(loginAttempts: any): void {
    const ctx = document.getElementById('barChart') as HTMLCanvasElement;

    if (ctx) {
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Successful Logins', 'Failed Logins'],
          datasets: [{
            label: 'Login Attempts',
            data: [loginAttempts.success, loginAttempts.failed],
            backgroundColor: [
              'rgba(75, 192, 192, 0.2)',
              'rgba(255, 99, 132, 0.2)'
            ],
            borderColor: [
              'rgba(75, 192, 192, 1)',
              'rgba(255, 99, 132, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    } else {
      console.error('Canvas element with id "barChart" not found.');
    }
  }
}
