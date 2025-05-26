# 🚗 Parking Management Mobile App - Frontend-Only Requirements
**Document**

---

## 1. Project Overview

**Objective:**  
Develop a secure **mobile frontend** for a Parking Management System using:
- **Expo React Native (Frontend)**
- **Mocked API services / placeholder data** (no backend integration)

**Key Features:**
- Role-based UI (Admin & Attendant)
- Real-time parking space display (mocked)
- QR-based check-in and check-out flows (simulated)
- Fee calculation logic on-device
- PDF generation mock (UI only)
- Local-only notification system

---

## 2. Functional Requirements

### 2.1 Authentication Flow (Frontend Only)
- **Login Screens** for Admin and Attendant
- **Role Selector** at start screen
- Simulated login (no real backend)
- Store role and session in local context (using React Context + AsyncStorage)

---

### 2.2 Vehicle Management (UI + Logic Only)

#### Vehicle Check-In:
- Input fields for plate, owner, model
- Dropdown or modal to select available (mock) parking space
- Generate mock ticket with QR code (on-device)
- Update mock space availability (via local state)

#### Vehicle Check-Out:
- Scan QR or enter ticket manually
- Calculate parking fee based on mocked check-in time
- Show payment modal (no actual transaction)
- Generate mock receipt and update UI

---

### 2.3 Admin Screens

- **Dashboard Overview**
  - Mock metrics: occupancy %, revenue, total vehicles
- **Reports Page**
  - Select date ranges
  - Generate and view mocked PDF layout (e.g., using `react-native-pdf` or simple scrollable report UI)
- **Attendant Manager**
  - List of mocked attendants
  - Add/remove/edit buttons with UI feedback

---

### 2.4 Attendant Screens

- **Check-in & Check-out Pages**
- **Space Map View** (mocked layout with color-coded spaces)
- **Alerts/Errors** for full lot, wrong ticket, etc. (via Toast or Modal)

---

### 2.5 Notification System (Local Only)

- Toast alerts for major actions (check-in success, error, etc.)
- Time-based reminders (setTimeout simulation)
- Local “Shift Change” notification popup

---

## 3. Technical Specifications

### 3.1 UI & State Management

- **React Navigation** for screen flows
- **React Context + Hooks** for AuthContext, AppContext
- **AsyncStorage** for session persistence
- **Mock data** for parking spots, vehicles, reports

### 3.2 UI Libraries

- **React Native Paper** for Material-style components
- **react-native-qrcode-svg** for QR ticket generation
- **react-native-toast-message** for notifications

### 3.3 File & Folder Structure

```
/src
  /components         # Buttons, Cards, Forms, QR modals
  /screens            # Login, Dashboard, Check-in, Reports
  /contexts           # AuthContext, AppContext
  /mock               # Static JSON for mock data (spaces, users, reports)
  /utils              # Fee calculator, time formatters, validators
  /assets             # Icons, images
```

---

## 4. Non-Functional Requirements

- **Offline-First:** All features work without internet
- **Performance:** UI should load quickly with local data
- **Security (UI only):** Hide sensitive actions unless Admin
- **Accessibility:** Proper labels, contrast, readable fonts
- **Error Boundaries:** For QR generation, invalid state

---

## 5. Development Milestones

**Phase 1:** Role Selection & AuthContext Setup (1 day)  
**Phase 2:** Vehicle Check-in/Checkout UI & Logic (2 days)  
**Phase 3:** Admin Dashboard & Report UI (1.5 days)  
**Phase 4:** Notification System, Polish & Testing (1 day)

---

## 6. Risk Management

| Risk                        | Mitigation                                     |
|----------------------------|------------------------------------------------|
| Mock data inconsistency    | Keep mock data in single source JSON files     |
| QR scanner fails on device | Fallback manual input field for ticket ID      |
| UI test delays             | Use Expo Go for live reload and device testing |

---

## 7. Appendix

- Expo Docs: https://docs.expo.dev  
- React Navigation: https://reactnavigation.org/  
- React Native Paper: https://callstack.github.io/react-native-paper/  
- Cursor AI Editor: https://www.cursor.so  

---

Flow chart
---
config:
  layout: dagre
---
flowchart TD
 subgraph UserTypes["UserTypes"]
        UserType{"User Type?"}
        Start(["Start"])
        AdminLogin["Admin Login"]
        AttendantLogin["Attendant Login"]
  end
 subgraph AttendantInterface["AttendantInterface"]
        AttendantDashboard["Attendant Dashboard"]
        ScanQR["Scan QR Code"]
        CheckIn["Check-in Vehicle"]
        CheckOut["Check-out Vehicle"]
        ViewMap["View Parking Map"]
        CollectInfo["Collect Vehicle Info"]
        AssignSpace["Assign Parking Space"]
        GenerateTicket["Generate Parking Ticket"]
        UpdateAvailability["Update Space Availability"]
        ValidTicket{"Valid Ticket?"}
        ProcessCheckout["Process Check-out"]
        ErrorHandling["Error Handling"]
        CalculateFee["Calculate Parking Fee"]
        ProcessPayment["Process Payment"]
        GenerateReceipt["Generate Receipt"]
        UpdateAvailability2["Update Space Availability"]
        SpaceStatus["View Space Status"]
  end
 subgraph AdminInterface["AdminInterface"]
        AdminDashboard["Admin Dashboard"]
        ViewOverview["View Parking Overview"]
        GenerateReports["Generate Revenue Reports"]
        ManageAttendants["Manage Attendants"]
        ConfigureSettings["Configure System Settings"]
        ViewAdminMap["View Interactive Map"]
        OccupancyStats["Occupancy Statistics"]
        RevenueMetrics["Revenue Metrics"]
        DailyReport["Daily Reports"]
        WeeklyReport["Weekly Reports"]
        MonthlyReport["Monthly Reports"]
        CustomReport["Custom Date Range"]
        ViewPerformance["View Attendant Performance"]
        AssignShifts["Assign Shifts"]
        ManageAccounts["Manage Accounts"]
        EditSpaces["Edit Parking Spaces"]
        ViewOccupancy["View Real-time Occupancy"]
  end
 subgraph NotificationSystem["NotificationSystem"]
        CapacityAlert["Full Capacity Alert"]
        SystemEvents["System Events"]
        DurationAlert["Extended Duration Alert"]
        ShiftChangeAlert["Shift Change Alert"]
        NotifyAdmin["Notify Admin"]
        NotifyAttendant["Notify Attendant"]
        NotifyStaff["Notify Staff"]
  end
 subgraph PaymentProcessing["PaymentProcessing"]
        PaymentMethod{"Payment Method?"}
        MobilePayment["Mobile Payment"]
        RecordTransaction["Record Transaction"]
        ProcessGateway["Process via Gateway"]
        TransactionStatus{"Transaction Status"}
        RetryPayment["Retry Payment"]
        StoreReceipt["Store Receipt"]
        CompleteTransaction["Complete Transaction"]
  end
    Start --> UserType
    UserType -- Admin --> AdminLogin
    UserType -- Attendant --> AttendantLogin
    AttendantLogin --> AttendantDashboard
    AttendantDashboard --> ScanQR & CheckIn & CheckOut & ViewMap
    CheckIn --> CollectInfo
    CollectInfo --> AssignSpace
    AssignSpace --> GenerateTicket
    GenerateTicket --> UpdateAvailability
    ScanQR --> ValidTicket
    ValidTicket -- Yes --> ProcessCheckout
    ValidTicket -- No --> ErrorHandling
    CheckOut --> CalculateFee
    CalculateFee --> ProcessPayment
    ProcessPayment --> GenerateReceipt & PaymentMethod
    GenerateReceipt --> UpdateAvailability2
    ViewMap --> SpaceStatus
    AdminLogin --> AdminDashboard
    AdminDashboard --> ViewOverview & GenerateReports & ManageAttendants & ConfigureSettings & ViewAdminMap
    ViewOverview --> OccupancyStats & RevenueMetrics
    GenerateReports --> DailyReport & WeeklyReport & MonthlyReport & CustomReport
    ManageAttendants --> ViewPerformance & AssignShifts & ManageAccounts
    ViewAdminMap --> EditSpaces & ViewOccupancy
    SystemEvents --> CapacityAlert & DurationAlert & ShiftChangeAlert
    CapacityAlert --> NotifyAdmin
    DurationAlert --> NotifyAttendant
    ShiftChangeAlert --> NotifyStaff
    PaymentMethod -- Cash --> CashPayment
    PaymentMethod -- Card --> CardPayment
    PaymentMethod -- Mobile --> MobilePayment
    CashPayment --> RecordTransaction
    CardPayment --> ProcessGateway
    MobilePayment --> ProcessGateway
    ProcessGateway --> TransactionStatus
    TransactionStatus -- Success --> RecordTransaction
    TransactionStatus -- Failed --> RetryPayment
    RecordTransaction --> StoreReceipt
    StoreReceipt --> CompleteTransaction
    UpdateAvailability --> SystemEvents
    UpdateAvailability2 --> SystemEvents
    CompleteTransaction --> UpdateAvailability2
