import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import StatCard from "../components/StatCard";
import IncomeBar from "../components/charts/IncomeBar";
import SpendLine from "../components/charts/SpendLine";
import IncomeLine from "../components/charts/IncomeLine";
import IncomeExpenseCombo from "../components/charts/IncomeExpenseCombo";
import AssetsDonut from "../components/charts/AssetsDonut";
import ProgressCard from "../components/ProgressCard";
import NotificationCard from "../components/NotificationCard";
import ExpenseList from "../components/ExpenseList";
import "./Dashboard.css";

export default function Dashboard(){
  return (
    <div className="layout">
      <Sidebar/>

      <main className="content">
        <Topbar/>

        <section className="dashboard-grid">
          {/* Left column main KPI */}
          <div className="hero card">
            <div className="small">Personal Finance Tracker</div>
            <div className="balance">Available Balance</div>
            <div className="balance-value">$14,822</div>
          </div>

          <StatCard title="Total Net Worth" value="$278,378" gradient />

          <div className="mini card">
            <div className="row space">
              <div>
                <div className="small">Spendings</div>
                <div className="h2">$9,228</div>
              </div>
            </div>
            <SpendLine/>
          </div>

          <div className="mini card">
            <div className="row space">
              <div>
                <div className="small">Income</div>
                <div className="h2">$24,050</div>
              </div>
            </div>
            <IncomeLine/>
          </div>

          <div className="card">
            <div className="small">Income Source</div>
            <IncomeBar/>
          </div>

          <div className="long card">
            <div className="row space">
              <div className="small">Income & Expenses</div>
              <div className="small">
                <strong>$20,239</strong> Max. Expenses &nbsp; &nbsp;
                <strong>$20,239</strong> Max. Income
              </div>
            </div>
            <IncomeExpenseCombo/>
          </div>

          <div className="card">
            <div className="small">Assets</div>
            <AssetsDonut/>
          </div>

          <ProgressCard/>
          <NotificationCard/>
          <ExpenseList/>
        </section>
      </main>
    </div>
  )
}
