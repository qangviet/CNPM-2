-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 11, 2024 at 04:02 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `nhapmoncnpm`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `ADMIN_ID` int(11) NOT NULL,
  `AD_NAME` varchar(50) NOT NULL,
  `USER_NAME` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `bill`
--

CREATE TABLE `bill` (
  `ID` int(11) NOT NULL,
  `BILL_ID` int(11) NOT NULL,
  `TOTAL` int(11) NOT NULL,
  `BILL_TIME` datetime DEFAULT NULL,
  `BILL_STATUS` tinyint(4) NOT NULL,
  `SH_ID` int(11) DEFAULT NULL,
  `RESERVATION_ID` int(11) DEFAULT NULL,
  `KH_ID` int(11) DEFAULT NULL,
  `PAYMENT_METHOD` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `bill`
--

INSERT INTO `bill` (`ID`, `BILL_ID`, `TOTAL`, `BILL_TIME`, `BILL_STATUS`, `SH_ID`, `RESERVATION_ID`, `KH_ID`, `PAYMENT_METHOD`) VALUES
(7, 65217638, 438, '2023-08-01 13:20:15', 2, NULL, 9086983, 111961, 'Chuyển khoản'),
(8, 65217638, 1400, '2023-08-01 13:20:15', 2, NULL, 9087034, 111961, 'Chuyển khoản'),
(11, 65217638, 180, '2023-08-01 13:20:15', 2, 7678128, NULL, 111961, 'Chuyển khoản'),
(12, 65217638, 180, '2023-08-01 13:20:15', 2, 36268, NULL, 111961, 'Chuyển khoản'),
(13, 65217638, 160, '2023-08-01 13:20:15', 2, 782800, NULL, 111961, 'Chuyển khoản'),
(14, 65217638, 120, '2023-08-01 13:20:15', 2, 3652561, NULL, 111961, 'Chuyển khoản'),
(15, 65217638, 160, '2023-08-01 13:20:15', 2, 9993236, NULL, 111961, 'Chuyển khoản'),
(16, 22800183, 1488, '2023-08-21 13:36:08', 2, NULL, 9156213, 111961, 'Tiền mặt'),
(17, 22800183, 20, '2023-08-21 13:36:15', 2, 2030175, NULL, 111961, 'Tiền mặt'),
(18, 44849914, 1552, '2023-08-21 13:25:03', 2, NULL, 9156218, 117569, 'Chuyển khoản'),
(19, 44849914, 120, '2023-08-21 13:25:03', 2, 3401687, NULL, 117569, 'Chuyển khoản'),
(20, 44849914, 160, '2023-08-21 13:25:03', 2, 1024836, NULL, 117569, 'Chuyển khoản'),
(21, 67925659, 1050, '2023-09-29 13:42:03', 2, NULL, 9389585, 130598, 'Tiền mặt'),
(22, 67925659, 20, '2023-09-29 13:42:03', 2, 6463364, NULL, 130598, 'Tiền mặt'),
(23, 67925659, 160, '2023-09-29 13:42:03', 2, 2053554, NULL, 130598, 'Tiền mặt'),
(24, 67925659, 576, '2023-09-29 13:42:03', 2, NULL, 9389597, 130598, 'Tiền mặt'),
(25, 44495, 1965, '2023-10-31 13:46:55', 2, NULL, 9683391, 134428, 'Tiền mặt'),
(26, 44495, 1362, '2023-10-31 13:46:55', 2, NULL, 9683392, 134428, 'Tiền mặt'),
(27, 44495, 240, '2023-10-31 13:46:55', 2, 4101933, NULL, 134428, 'Tiền mặt'),
(28, 44495, 180, '2023-10-31 13:46:55', 2, 3554887, NULL, 134428, 'Tiền mặt'),
(29, 44495, 180, '2023-10-31 13:46:55', 2, 9885525, NULL, 134428, 'Tiền mặt'),
(30, 44495, 20, '2023-10-31 13:46:55', 2, 4201118, NULL, 134428, 'Tiền mặt'),
(31, 94340673, 2290, '2023-11-29 14:01:48', 2, NULL, 9985833, 142645, 'Tiền mặt'),
(32, 94340673, 657, '2023-11-29 14:01:51', 2, NULL, 9985834, 142645, 'Tiền mặt'),
(33, 94340673, 240, '2023-11-30 14:01:45', 2, 6921048, NULL, 142645, 'Tiền mặt'),
(34, 94340673, 400, '2023-11-30 14:01:43', 2, 3957047, NULL, 142645, 'Tiền mặt'),
(35, 94340673, 160, '2023-11-30 14:01:40', 2, 9816643, NULL, 142645, 'Tiền mặt'),
(36, 98147671, 438, '2023-11-30 14:01:37', 2, NULL, 9985867, 159412, 'Tiền mặt'),
(37, 98147671, 604, '2023-11-29 14:01:53', 2, NULL, 9985868, 159412, 'Tiền mặt'),
(38, 98147671, 908, '2023-11-29 14:01:33', 2, NULL, 9985869, 159412, 'Tiền mặt'),
(39, 22468932, 1185, '2023-11-30 14:00:50', 2, NULL, 9985876, 173857, 'Chuyển khoản'),
(40, 22468932, 948, '2023-11-30 14:00:40', 2, NULL, 9985877, 173857, 'Chuyển khoản'),
(41, 16617716, 1975, '2023-12-15 14:05:23', 2, NULL, 245098, 175536, 'Tiền mặt'),
(42, 26858725, 752, '2024-01-15 17:06:26', 2, NULL, 487947, 142645, 'Chuyển khoản'),
(43, 21587975, 620, '2024-01-10 19:10:27', 2, NULL, 488859, 70203676, 'Chuyển khoản'),
(44, 21587975, 60, '2024-01-10 19:10:27', 2, 5694700, NULL, 70203676, 'Chuyển khoản'),
(46, 53232489, 160, NULL, 0, 2767431, NULL, 70203676, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `coupon`
--

CREATE TABLE `coupon` (
  `COUPON_ID` varchar(20) NOT NULL,
  `STARTDATE` date NOT NULL,
  `ENDDATE` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `feedback`
--

CREATE TABLE `feedback` (
  `FB_ID` int(11) NOT NULL,
  `FB_TIME` datetime NOT NULL,
  `FB_RATING` tinyint(4) NOT NULL,
  `FB_TEXT` text NOT NULL,
  `KH_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `feedback`
--

INSERT INTO `feedback` (`FB_ID`, `FB_TIME`, `FB_RATING`, `FB_TEXT`, `KH_ID`) VALUES
(1, '2024-01-11 15:22:53', 5, 'Phòng ở Hust Stay Smart rất sạch sẽ và thoải mái.', 196783),
(2, '2023-12-08 21:23:34', 5, 'Dịch vụ của nhân viên tại Hust Stay Smart rất thân thiện và chuyên nghiệp.', 173857),
(3, '2024-01-11 15:23:34', 4, 'Tôi rất hài lòng với tiện nghi trong phòng ở Hust Stay Smart.', 142645),
(4, '2024-01-01 21:23:55', 5, 'Khách sạn này có vị trí thuận lợi và dễ tiếp cận.', 70481525),
(5, '2024-01-11 15:23:34', 3, 'Tôi thích cách Hust Stay Smart quản lý và duy trì khách sạn của mình.', 70479208),
(6, '2023-11-18 21:23:55', 5, 'Đồ ăn sáng tại Hust Stay Smart rất ngon và đa dạng.', 134428),
(7, '2024-01-11 15:23:34', 5, 'Tôi cảm thấy an toàn và yên tĩnh khi lưu trú tại Hust Stay Smart.', 193134),
(8, '2024-01-07 21:23:55', 4, 'Giường ở Hust Stay Smart rất thoải mái và êm ái. Tôi rất hài lòng với quy trình đăng ký và nhận phòng tại Hust Stay Smart. Dịch vụ phòng ở Hust Stay Smart rất nhanh chóng và chuyên nghiệp.', 70203676),
(9, '2024-01-11 15:23:34', 5, 'Tôi được đối xử tốt và nhận được sự chăm sóc tận tâm tại Hust Stay Smart. Phòng tắm ở Hust Stay Smart rất tiện nghi và sạch sẽ. Khách sạn này có một không gian chung rất dễ chịu và thoải mái.', 175536);

-- --------------------------------------------------------

--
-- Table structure for table `khachhang`
--

CREATE TABLE `khachhang` (
  `KH_ID` int(11) NOT NULL,
  `KH_NAME` varchar(50) NOT NULL,
  `KH_SDT` char(11) NOT NULL,
  `KH_ADDRESS` varchar(100) NOT NULL,
  `KH_CCCD` char(20) NOT NULL,
  `KH_GIOITINH` int(11) NOT NULL,
  `USER_NAME` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `khachhang`
--

INSERT INTO `khachhang` (`KH_ID`, `KH_NAME`, `KH_SDT`, `KH_ADDRESS`, `KH_CCCD`, `KH_GIOITINH`, `USER_NAME`) VALUES
(103262, 'Trương Việt', '01285185', '142 Bà Triệu, Thành phố Thanh Hóa, Thanh Hóa', '001203014599', 0, 'abcde'),
(111961, 'Đặng Nguyên Duy', '0357 105 21', '56 Trần Phú, Hội An, Quảng Nam', '001203013290', 0, 'duy'),
(117569, 'Nguyễn Thị Thúy', '0327 592 43', '145 Thống Nhất, Nha Trang, Khánh Hòa', '001203012870', 1, 'thuy'),
(130598, 'Đỗ Trần Đại Lộc', '0357 110 13', '15 Thống Nhất, Thành phố Vũng Tàu, Bà Rịa - Vũng Tàu', '001203015955', 0, 'loc'),
(134428, 'Ngô Duy Kha', '0303 461 61', '104 Ngô Quyền, Ninh Kiều, Cần Thơ', '001203011708', 0, 'kha'),
(142645, 'Lê Thị Thanh Thùy', '0335 365 06', '23 Bùi Thị Xuân, Đà Lạt, Lâm Đồng', '001203014588', 1, 'abc'),
(159412, 'Trần Thị Phương', '0303 093 58', '3 Hạ Long, Bãi Cháy, Quảng Ninh', '001203019430', 1, 'phuong'),
(173857, 'Lê Quốc Khánh', '0314 323 08', '22 Lê Lợi, Thành phố Huế, Thừa Thiên Huế', '001203013796', 0, 'khanh'),
(175536, 'Võ Nguyễn Đăng Hải', '0367 840 77', '108 Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh', '001203013841', 0, 'linh'),
(193134, 'Trần Nguyễn Thảo Linh', '0380 069 18', '42 Trần Phú, Ba Đình, Hà Nội', '001203011250', 1, 'hai'),
(196783, 'Bùi Thị Quỳnh Thư', '0308 193 97', '75 Lê Lợi, Hải Châu, Đà Nẵng', '001203011896', 1, 'thu'),
(70203676, 'Trương Quang Việt', '0347 039 02', '206 Đường Nguyễn Du, Quận Hoàn Kiếm, Thành phố Hà Nội', '001203021809', 0, 'abcd'),
(70479208, 'Nguyễn Văn Trí', '03412315169', '59 Trần Hưng Đạo, Thành phố Nam Định, Nam Định', '001203021122', 0, 'tri'),
(70481525, 'Nguyễn Văn An', '01258158', 'số 9999, đường A', '123115', 0, 'an');

-- --------------------------------------------------------

--
-- Table structure for table `nhanvien`
--

CREATE TABLE `nhanvien` (
  `NV_ID` int(11) NOT NULL,
  `NV_NAME` varchar(50) NOT NULL,
  `NV_SDT` char(11) NOT NULL,
  `NV_CCCD` char(20) NOT NULL,
  `NV_ADDRESS` varchar(100) NOT NULL,
  `USER_NAME` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `nhanvien`
--

INSERT INTO `nhanvien` (`NV_ID`, `NV_NAME`, `NV_SDT`, `NV_CCCD`, `NV_ADDRESS`, `USER_NAME`) VALUES
(15509152, 'Lê Thị Thu Hằng', '037 923 806', '001203026948', '789 Đường Trần Phú, Quận Hải Châu, Đà Nẵng', 'nhanvien3'),
(19726325, 'Phạm Minh Tuấn', '037 325 602', '001203027650', '147 Đường Nguyễn Thị Minh Khai, Quận 3, Thành phố Hồ Chí Minh', 'nhanvien4'),
(23956985, 'Bùi Minh Tuấn', '037 280 822', '001203027131', '963 Đường Nguyễn Công Trứ, Quận Hoàn Kiếm, Hà Nội', 'nhanvien9'),
(39909190, 'Vũ Đức Anh', '037 173 111', '001203025671', '258 Đường Lý Thường Kiệt, Quận Cầu Giấy, Hà Nội', 'nhanvien5'),
(52391422, 'Trần Thị Mai', '037 869 338', '001203028259', '369 Đường Hùng Vương, Quận Ninh Kiều, Cần Thơ', 'nhanvien10'),
(52460029, 'Ngô Quang Dũng', '037 075 796', '001203024542', '741 Đường Nam Kỳ Khởi Nghĩa, Quận 1, Thành phố Hồ Chí Minh', 'nhanvien7'),
(55027423, 'Đặng Thị Trang', '037 273 336', '001203024225', '852 Đường Trần Quốc Toản, Quận Hải Châu, Đà Nẵng', 'nhanvien8'),
(58195143, 'Trần Văn Nam', '037 076 488', '001203028923', '456 Đường Nguyễn Du, Quận Hoàn Kiếm, Hà Nội', 'nhanvien2'),
(75202598, 'Hoàng Thị Lan', '037 918 502', '001203024765', '369 Đường Trần Hưng Đạo, Quận Lê Chân, Hải Phòng', 'nhanvien6'),
(83423641, 'Nguyễn Thị Hương', '037 616 100', '001203026911', '123 Đường Lê Lợi, Quận 1, Thành phố Hồ Chí Minh', 'nhanvien1');

-- --------------------------------------------------------

--
-- Table structure for table `reservation`
--

CREATE TABLE `reservation` (
  `RESERVATION_ID` int(11) NOT NULL,
  `CheckInDate` date NOT NULL,
  `CheckOutDate` date NOT NULL,
  `KH_ID` int(11) NOT NULL,
  `ROOM_ID` int(11) DEFAULT NULL,
  `NV_ID` int(11) DEFAULT NULL,
  `RESERVATION_STATUS` tinyint(4) NOT NULL,
  `create_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `reservation`
--

INSERT INTO `reservation` (`RESERVATION_ID`, `CheckInDate`, `CheckOutDate`, `KH_ID`, `ROOM_ID`, `NV_ID`, `RESERVATION_STATUS`, `create_at`) VALUES
(245098, '2023-12-22', '2023-12-27', 175536, 409, 39909190, 1, '2023-12-13 14:03:00'),
(487947, '2024-01-12', '2024-01-14', 142645, 302, 39909190, 1, '2024-01-10 16:37:59'),
(488859, '2024-01-12', '2024-01-14', 70203676, 103, 39909190, 1, '2024-01-10 19:09:56'),
(490743, '2024-01-13', '2024-01-19', 70203676, 104, 39909190, -1, '2024-01-11 00:23:59'),
(9086983, '2023-08-04', '2023-08-06', 111961, 104, 83423641, 1, '2023-08-01 13:03:54'),
(9087034, '2023-08-11', '2023-08-15', 111961, 105, 83423641, 1, '2023-08-01 13:12:22'),
(9156213, '2023-08-19', '2023-08-22', 111961, 209, 83423641, 1, '2023-08-09 13:22:17'),
(9156218, '2023-08-16', '2023-08-20', 117569, 203, 83423641, 1, '2023-08-09 13:23:08'),
(9389585, '2023-09-07', '2023-09-10', 130598, 102, 83423641, 1, '2023-09-05 13:37:38'),
(9389597, '2023-09-08', '2023-09-10', 130598, 207, 83423641, 1, '2023-09-05 13:39:39'),
(9683391, '2023-10-10', '2023-10-15', 134428, 310, 39909190, 1, '2023-10-09 13:45:11'),
(9683392, '2023-10-18', '2023-10-21', 134428, 210, 39909190, 1, '2023-10-09 13:45:21'),
(9985833, '2023-11-14', '2023-11-19', 142645, 303, 39909190, 1, '2023-11-13 13:52:15'),
(9985834, '2023-11-23', '2023-11-26', 142645, 104, 39909190, 1, '2023-11-13 13:52:24'),
(9985867, '2023-11-15', '2023-11-17', 159412, 104, 39909190, 1, '2023-11-13 13:57:52'),
(9985868, '2023-11-15', '2023-11-17', 159412, 205, 39909190, 1, '2023-11-13 13:58:05'),
(9985869, '2023-11-15', '2023-11-17', 159412, 210, 39909190, 1, '2023-11-13 13:58:14'),
(9985876, '2023-11-24', '2023-11-27', 173857, 409, 39909190, 1, '2023-11-13 13:59:23'),
(9985877, '2023-11-28', '2023-11-30', 173857, 407, 39909190, 1, '2023-11-13 13:59:34');

-- --------------------------------------------------------

--
-- Table structure for table `room`
--

CREATE TABLE `room` (
  `ROOM_ID` int(11) NOT NULL,
  `ROOM_TYPE` char(10) NOT NULL,
  `ROOM_PRICE` int(11) NOT NULL,
  `ROOM_DESC` text NOT NULL,
  `ROOM_LOCK` tinyint(4) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `room`
--

INSERT INTO `room` (`ROOM_ID`, `ROOM_TYPE`, `ROOM_PRICE`, `ROOM_DESC`, `ROOM_LOCK`) VALUES
(101, 'Family', 300, 'Phòng Family rộng rãi và sang trọng, được trang bị đầy đủ tiện nghi hiện đại. Từ cửa sổ phòng, khách hàng có thể ngắm nhìn toàn cảnh thành phố.', 1),
(102, 'Standard', 350, 'Phòng Standard là lựa chọn phổ biến cho các khách hàng có ngân sách hạn chế. Phòng được trang bị đầy đủ tiện nghi cơ bản và mang lại sự thoải mái cho khách hàng.', 1),
(103, 'Superior', 310, 'Phòng Superior tiện nghi với giường queen-size, phòng tắm riêng và không gian thoải mái để nghỉ ngơi.', 1),
(104, 'Executive', 219, 'Suite sang trọng với không gian phòng khách riêng biệt, giường king-size, phòng tắm với bồn tắm và các tiện nghi cao cấp. a\n ', 1),
(105, 'Family', 350, 'Phòng rộng rãi và thoải mái, phù hợp cho gia đình, với một giường đôi và hai giường đơn, phòng tắm riêng và không gian chung tiện nghi.\r\n', 1),
(106, 'Ocean View', 316, 'Phòng với tầm nhìn ra biển tuyệt đẹp, bao gồm giường king-size, phòng tắm riêng và ban công riêng.\r\n', 1),
(107, 'Standard', 244, 'Phòng Standard với không gian tầng lửng, giường king-size, phòng tắm riêng và khu vực nghỉ ngơi riêng biệt.', 1),
(108, 'Standard', 327, 'Phòng tiêu chuẩn với giường đôi hoặc giường đơn, phòng tắm riêng và các tiện nghi cơ bản.', 1),
(109, 'Superior', 350, 'Phòng với tầm nhìn ra khu vườn xanh mát, bao gồm giường king-size, phòng tắm riêng và không gian nghỉ ngơi riêng.', 1),
(110, 'Superior', 409, 'Phòng Superior là sự kết hợp hoàn hảo giữa tiện nghi và giá trị. Với không gian thoáng đãng và nội thất tinh tế, phòng đáp ứng mọi nhu cầu của khách hàng.', 1),
(201, 'Deluxe', 237, 'Phòng Deluxe rộng rãi và sang trọng, được trang bị giường King-size, TV màn hình phẳng, minibar và két an toàn. Phòng có khu vực làm việc riêng, kết nối Wi-Fi miễn phí và phòng tắm riêng với bồn tắm hoặc vòi sen.', 1),
(202, 'Standard', 382, 'Phòng thoải mái và tiện nghi với giường Queen-size hoặc hai giường đơn, TV cáp, minibar và máy pha cà phê/ấm đun nước. Phòng có phòng tắm riêng với vòi sen và cung cấp dịch vụ phòng hàng ngày.\n', 1),
(203, 'Executive', 388, 'Phòng Executive được thiết kế đặc biệt dành cho khách hàng doanh nhân. Ngoài các tiện ích của phòng Deluxe, phòng Executive còn có khu vực tiếp khách riêng, máy in, dịch vụ đặt vé và hướng dẫn du lịch. Khách hàng cũng được sử dụng miễn phí phòng họp trong một thời gian giới hạn.', 1),
(204, 'Family', 241, 'Phòng rộng lớn với không gian sống riêng, phòng ngủ riêng và phòng tắm riêng. Phòng được trang bị ghế sofa, TV màn hình phẳng, minibar, máy pha cà phê/ấm đun nước và dịch vụ phòng hàng ngày. Khách hàng cũng nhận được dịch vụ đỗ xe và đưa đón sân bay miễn phí.', 1),
(205, 'Family', 302, 'Phòng Family rộng rãi và thoải mái, phù hợp cho gia đình lưu trú. Phòng có giường King-size và giường đơn, TV cáp, minibar và phòng tắm riêng. Dịch vụ phòng hàng ngày và truyền hình cáp miễn phí cũng được cung cấp.', 1),
(206, 'Deluxe', 338, 'Phòng nằm ở tầng cao với tầm nhìn toàn cảnh đẹp. Phòng được trang bị giường King-size, khu vực tiếp khách riêng, minibar, TV màn hình phẳng và phòng tắm riêng với bồn tắm. Khách hàng cũng có quyền sử dụng phòng họp và truy cập Wi-Fi miễn phí.', 1),
(207, 'Superior', 288, 'Phòng Superior mang đến sự thoải mái và tiện nghi với giường King-size hoặc giường đơn, TV cáp, minibar và máy pha cà phê/ấm đun nước. Phòng có phòng tắm riêng với vòi sen và dịch vụ phòng hàng ngày.\r\n', 1),
(208, 'Superior', 386, 'Phòng được thiết kế hiện đại với không gian mở, bao gồm khu vực ngủ với giường King-size hoặc giường đơn, khu vực tiếp khách với ghế sofa và TV mànhình phẳng, minibar và khu vực bếp nhỏ với lò vi sóng và tủ lạnh. Phòng cũng có phòng tắm riêng với vòi sen và cung cấp dịch vụ phòng hàng ngày.', 1),
(209, 'Deluxe', 496, 'Phòng được thiết kế lãng mạn và sang trọng cho các cặp đôi. Phòng có giường King-size, khu vực tiếp khách riêng, TV màn hình phẳng, minibar và phòng tắm riêng với bồn tắm. Khách hàng cũng nhận được dịch vụ phòng hàng ngày và truyền hình cáp miễn phí.', 1),
(210, 'Executive', 454, 'Phòng là biểu tượng của sự xa hoa và đẳng cấp. Phòng có không gian rộng lớn với phòng ngủ riêng, phòng khách, phòng ăn và ban công riêng. Phòng được trang bị ghế sofa, TV màn hình phẳng, minibar, máy pha cà phê/ấm đun nước và phòng tắm riêng với bồn tắm. Dịch vụ phòng hàng ngày, truyền hình cáp và truy cập Wi-Fi miễn phí cũng được cung cấp.', 1),
(301, 'Superior', 339, 'Phòng mang đến tầm nhìn tuyệt đẹp ra biển. Phòng có giường King-size, ban công riêng, minibar, TV màn hình phẳng và phòng tắm riêng với bồn tắm. Khách hàng cũng nhận được dịch vụ phòng hàng ngày và truyền hình cáp miễn phí.', 1),
(302, 'Family', 376, 'Phòng Family là một sự lựa chọn lý tưởng cho gia đình lớn. Phòng có hai phòng ngủ riêng biệt, phòng khách với TV màn hình phẳng, minibar và máy pha cà phê/ấm đun nước. Phòng cũng có phòng tắm riêng với vòi sen và cung cấp dịch vụ phòng hàng ngày.\nPhòng Duplex:', 1),
(303, 'Deluxe', 458, 'Phòng Deluxe View cho phép khách hàng ngắm nhìn toàn cảnh thành phố từ cửa sổ. Phòng có giường King-size hoặc giường đơn, minibar, TV màn hình phẳng và phòng tắm riêng với vòi sen. Dịch vụ phòng hàng ngày và truyền hình cáp miễn phí cũng được cung cấp.', 1),
(304, 'Deluxe', 380, 'Phòng Garden View mang đến tầm nhìn đẹp về khu vườn xanh mát. Phòng có giường King-size hoặc giường đơn, minibar, TV màn hình phẳng và phòng tắm riêng với vòi sen. Dịch vụ phòng hàng ngày và truyền hình cáp miễn phí cũng được cung cấp.', 1),
(305, 'Standard', 298, 'Phòng rộng rãi và thoải mái, phù hợp cho gia đình lưu trú. Phòng có giường King-size và giường đơn, TV cáp, minibar và phòng tắm riêng. Dịch vụ phòng hàng ngày và truyền hình cáp miễn phí cũng được cung cấp.', 1),
(306, 'Executive', 397, 'Giường đôi rộng, phòng khách riêng, phòng tắm rộng, tủ quần áo lớn, bàn làm việc, tivi màn hình phẳng lớn, điều hòa, minibar đầy đủ, phòng ăn riêng, kem, wifi, jacuzzi', 1),
(307, 'Superior', 337, '2 giường đơn rộng, phòng khách riêng rộng, 2 phòng tắm rộng, tủ quần áo lớn, 2 bàn làm việc, tivi màn hình phẳng lớn, điều hòa, minibar đầy đủ, phòng ăn riêng, jacuzzi, kem, wifi', 1),
(308, 'Executive', 473, 'Giường đơn rộng, phòng làm việc riêng đầy đủ trang thiết bị, phòng tắm rộng, tủ quần áo lớn, bàn Phòng làm việc đầy đủ, tivi màn hình phẳng lớn, điều hòa, minibar, bàn ăn riêng, kem, wifi, jacuzzi', 1),
(309, 'Deluxe', 346, '2 giường đơn rộng, phòng khách kiêm phòng làm việc riêng đầy đủ trang thiết bị, 2 phòng tắm rộng, tủ quần áo lớn, 2 bàn làm việc đầy đủ, tivi, điều hòa, minibar, bàn ăn riêng, jacuzzi, kem, wifi', 1),
(310, 'Superior', 393, 'Giường đôi rộng design sang trọng, phòng khách rộng, phòng làm việc riêng, phòng tắm hồ bơi, tủ quần áo lớn, bàn làm việc hiện đại, tivi tỷ lệ màn hình lớn nhất, điều hòa, phòng ăn riêng, phòng giải trí, minibar, jacuzzi trong phòng, dịch vụ đầy đủ, kem cao cấp, wifi tốc độ cao\r\n', 1),
(401, 'Standard', 430, 'Giường đơn rộng, phòng khách riêng nhỏ, phòng tắm rộng với bồn tắm, tủ quần áo lớn, bàn làm việc, tivi màn hình phẳng lớn, điều hòa, minibar đầy đủ, kem, wifi, jacuzzi trong phòng', 1),
(402, 'Executive', 380, '2 giường đơn rộng, phòng khách riêng rộng, 2 phòng tắm rộng với bồn tắm, tủ quần áo lớn, bàn làm việc đôi, tivi màn hình phẳng lớn, điều hòa, minibar đầy đủ, phòng ăn riêng, jacuzzi trong phòng, kem, wifi', 1),
(403, 'Superior', 484, 'Giường đơn rộng sâu, phòng khách riêng đẹp, phòng làm việc riêng đầy đủ trang thiết bị, phòng tắm sang trọng, tủ quần áo lớn, bàn làm việc hiện đại, tivi màn hình phẳng lớn, điều hòa, minibar, phòng ăn riêng, kem miễn phí, wifi', 1),
(404, 'Executive', 564, '2 giường đơn rộng sâu, phòng khách riêng sang trọng, phòng làm việc chung đầy đủ trang thiết bị, 2 phòng tắm sang trọng, tủ quần áo lớn, 2 bàn làm việc hiện đại, tivi màn hình phẳng lớn, điều hòa, minibar, phòng ăn riêng, kem miễn phí, wifi, bồn tắm hơi', 1),
(405, 'Standard', 497, 'Phòng thoải mái và tiện nghi với giường Queen-size hoặc hai giường đơn, TV cáp, minibar và máy pha cà phê/ấm đun nước. Phòng có phòng tắm riêng với vòi sen và cung cấp dịch vụ phòng hàng ngày.\r\n', 1),
(406, 'Deluxe', 371, 'Phòng rộng lớn với không gian sống riêng, phòng ngủ riêng và phòng tắm riêng. Phòng được trang bị ghế sofa, TV màn hình phẳng, minibar, máy pha cà phê/ấm đun nước và dịch vụ phòng hàng ngày. Khách hàng cũng nhận được dịch vụ đỗ xe và đưa đón sân bay miễn phí.', 1),
(407, 'Superior', 474, 'Phòng được thiết kế hiện đại với không gian mở, bao gồm khu vực ngủ với giường King-size hoặc giường đơn, khu vực tiếp khách với ghế sofa và TV mànhình phẳng, minibar và khu vực bếp nhỏ với lò vi sóng và tủ lạnh. Phòng cũng có phòng tắm riêng với vòi sen và cung cấp dịch vụ phòng hàng ngày.', 1),
(408, 'Family', 452, 'Phòng Family là một sự lựa chọn lý tưởng cho gia đình lớn. Phòng có hai phòng ngủ riêng biệt, phòng khách với TV màn hình phẳng, minibar và máy pha cà phê/ấm đun nước. Phòng cũng có phòng tắm riêng với vòi sen và cung cấp dịch vụ phòng hàng ngày.\r\nPhòng Duplex:', 1),
(409, 'Standard', 395, 'Phòng rộng rãi và thoải mái, phù hợp cho gia đình lưu trú. Phòng có giường King-size và giường đơn, TV cáp, minibar và phòng tắm riêng. Dịch vụ phòng hàng ngày và truyền hình cáp miễn phí cũng được cung cấp.', 1),
(410, 'Superior', 265, 'Phòng rộng rãi và thoải mái, phù hợp cho gia đình lưu trú. Phòng có giường King-size và giường đơn, TV cáp, minibar và phòng tắm riêng. Dịch vụ phòng hàng ngày và truyền hình cáp miễn phí cũng được cung cấp.', 1),
(509, 'Test', 1000, 'Test', 1),
(555, 'Deluxy', 1, 'Test', 1),
(601, 'Test', 1000, 'Test', 1);

-- --------------------------------------------------------

--
-- Table structure for table `service`
--

CREATE TABLE `service` (
  `SERVICE_ID` int(11) NOT NULL,
  `SERVICE_NAME` varchar(50) NOT NULL,
  `SERVICE_PRICE` int(11) NOT NULL,
  `SERVICE_DESC` text NOT NULL,
  `SERVICE_LOCK` tinyint(4) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `service`
--

INSERT INTO `service` (`SERVICE_ID`, `SERVICE_NAME`, `SERVICE_PRICE`, `SERVICE_DESC`, `SERVICE_LOCK`) VALUES
(1, 'Bữa trưa - 1', 80, 'Đặt bữa trưa theo từng mâm (6,7 người/1 mâm) bao gồm các món:\n- Món chính: Thịt gà, thịt bò, thịt lợn, hải sản,...\n- Món phụ: Rau củ, cơm, bún, phở,...\n- Món tráng miệng: Trái cây, chè, bánh ngọt,...', 1),
(2, 'Bữa trưa - 2', 80, 'Đặt bữa trưa theo từng mâm (6,7 người/1 mâm) bao gồm các món:\r\n- Món khai vị: Gỏi, salad, súp,...\r\n- Món chính: Thịt gà, thịt bò, thịt lợn, hải sản,...\r\n- Món phụ: Rau củ, cơm, bún, phở,...\r\n- Món tráng miệng: Trái cây, chè, bánh ngọt,...', 1),
(3, 'Bữa tối - 1', 60, 'Đặt bữa trưa theo từng mâm (6,7 người/1 mâm) bao gồm các món:\n- Món chính: Thịt gà, thịt bò, thịt lợn, hải sản,...\n- Món phụ: Rau củ, cơm, bún, phở,...\n- Món tráng miệng: Trái cây, chè, bánh ngọt,...', 1),
(4, 'Bữa tối - 2', 80, 'Đặt bữa trưa theo từng mâm (6,7 người/1 mâm) bao gồm các món:\n- Món khai vị: Gỏi, salad, súp,...\n- Món chính: Thịt gà, thịt bò, thịt lợn, hải sản,...\n- Món phụ: Rau củ, cơm, bún, phở,...\n- Món tráng miệng: Trái cây, chè, bánh ngọt, rượu chè', 1),
(5, 'Xe đưa đón', 10, 'Xe đón từ sân bay tới khách sạn\nXe đưa từ khách sạn tới sân bay', 1);

-- --------------------------------------------------------

--
-- Table structure for table `service_history`
--

CREATE TABLE `service_history` (
  `SH_ID` int(11) NOT NULL,
  `KH_ID` int(11) NOT NULL,
  `SERVICE_ID` int(11) DEFAULT NULL,
  `QUANTITY` int(11) NOT NULL,
  `DATE` date DEFAULT NULL,
  `TIME` time DEFAULT NULL,
  `TOTAL_PRICE` int(11) NOT NULL,
  `STATUS` tinyint(4) NOT NULL,
  `create_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `service_history`
--

INSERT INTO `service_history` (`SH_ID`, `KH_ID`, `SERVICE_ID`, `QUANTITY`, `DATE`, `TIME`, `TOTAL_PRICE`, `STATUS`, `create_at`) VALUES
(36268, 111961, 1, 3, '2023-08-04', '11:30:00', 180, 1, '2023-08-03 17:18:25'),
(782800, 111961, 2, 2, '2023-08-11', '11:15:00', 160, 1, '2023-08-05 17:18:25'),
(1024836, 117569, 4, 2, '2023-08-17', '18:30:00', 160, 1, '2023-08-10 17:18:25'),
(2030175, 111961, 5, 2, '2023-08-21', '17:22:00', 20, 1, '2023-08-17 17:18:25'),
(2053554, 130598, 4, 2, '2023-09-08', '18:30:00', 160, 1, '2023-09-02 17:18:25'),
(2767431, 70203676, 1, 2, '2024-01-12', '10:35:00', 160, 1, '2024-01-11 02:34:54'),
(3401687, 117569, 3, 2, '2023-08-16', '19:25:00', 120, 1, '2023-08-05 17:18:25'),
(3554887, 134428, 3, 3, '2023-10-19', '13:46:00', 180, 1, '2023-10-02 17:18:25'),
(3652561, 111961, 3, 2, '2023-08-12', '19:20:00', 120, 1, '2023-08-08 17:18:25'),
(3957047, 142645, 2, 5, '2023-11-17', '10:00:00', 400, 1, '2023-11-14 17:18:25'),
(4101933, 134428, 2, 3, '2023-10-19', '13:46:00', 240, 1, '2023-10-02 17:18:25'),
(4201118, 134428, 5, 2, '2023-10-14', '13:47:00', 20, 1, '2023-10-02 17:18:25'),
(5397298, 111961, 2, 2, '2023-08-05', '11:10:00', 160, -1, '2023-08-01 17:18:25'),
(5694700, 70203676, 1, 1, '2024-01-13', '11:10:00', 60, 1, '2024-01-10 19:10:19'),
(5893395, 111961, 1, 3, '2023-08-04', '11:00:00', 180, -1, '2023-08-02 17:18:25'),
(6463364, 130598, 5, 2, '2023-09-07', '11:20:00', 20, 1, '2023-09-05 17:18:25'),
(6921048, 142645, 2, 3, '2023-11-16', '10:58:00', 240, 1, '2023-11-12 17:18:25'),
(7678128, 111961, 3, 3, '2023-08-05', '19:20:00', 180, 1, '2023-08-01 17:18:25'),
(9816643, 142645, 4, 2, '2023-11-18', '19:03:00', 160, 1, '2023-11-13 17:18:25'),
(9885525, 134428, 3, 3, '2023-10-11', '13:48:00', 180, 1, '2023-10-03 17:18:25'),
(9993236, 111961, 4, 2, '2023-08-13', '18:30:00', 160, 1, '2023-08-08 17:18:25');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `USER_NAME` varchar(50) NOT NULL,
  `USER_PASS` char(50) NOT NULL,
  `USER_IDENTITY` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`USER_NAME`, `USER_PASS`, `USER_IDENTITY`) VALUES
('abc', '123', 1),
('abcd', '1234', 1),
('abcde', '12345', 1),
('admin', 'admin', 3),
('an', 'an', 1),
('duy', 'duy', 1),
('hai', 'hai', 1),
('kha', 'kha', 1),
('khanh', 'khanh', 1),
('kong', 'kong', 1),
('linh', 'linh', 1),
('loc', 'loc', 1),
('manh', 'manh', 1),
('nhanvien1', 'nhanvien1', 2),
('nhanvien10', 'nhanvien10', 2),
('nhanvien2', 'nhanvien2', 2),
('nhanvien3', 'nhanvien3', 2),
('nhanvien4', 'nhanvien4', 2),
('nhanvien5', 'nhanvien5', 2),
('nhanvien6', 'nhanvien6', 2),
('nhanvien7', 'nhanvien7', 2),
('nhanvien8', 'nhanvien8', 2),
('nhanvien9', 'nhanvien9', 2),
('phuong', 'phuong', 1),
('quang', 'quang', 1),
('thu', 'thu', 1),
('thuy', 'thuy', 1),
('tri', 'tri', 1),
('truong', 'truong', 1),
('viet', 'viet', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`ADMIN_ID`),
  ADD KEY `admin_user_frk` (`USER_NAME`);

--
-- Indexes for table `bill`
--
ALTER TABLE `bill`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `SH_ID` (`SH_ID`),
  ADD KEY `KH_ID` (`KH_ID`),
  ADD KEY `RESERVATION_ID` (`RESERVATION_ID`);

--
-- Indexes for table `coupon`
--
ALTER TABLE `coupon`
  ADD PRIMARY KEY (`COUPON_ID`);

--
-- Indexes for table `feedback`
--
ALTER TABLE `feedback`
  ADD PRIMARY KEY (`FB_ID`),
  ADD KEY `KH_ID` (`KH_ID`);

--
-- Indexes for table `khachhang`
--
ALTER TABLE `khachhang`
  ADD PRIMARY KEY (`KH_ID`),
  ADD UNIQUE KEY `USER_NAME` (`USER_NAME`),
  ADD UNIQUE KEY `USER_NAME_2` (`USER_NAME`),
  ADD KEY `KH_ID` (`KH_ID`);

--
-- Indexes for table `nhanvien`
--
ALTER TABLE `nhanvien`
  ADD PRIMARY KEY (`NV_ID`),
  ADD KEY `NV_ID` (`NV_ID`),
  ADD KEY `NV_ID_2` (`NV_ID`),
  ADD KEY `nhanvien_user_frk` (`USER_NAME`);

--
-- Indexes for table `reservation`
--
ALTER TABLE `reservation`
  ADD PRIMARY KEY (`RESERVATION_ID`),
  ADD KEY `KH_ID` (`KH_ID`,`ROOM_ID`,`NV_ID`),
  ADD KEY `ROOM_ID` (`ROOM_ID`),
  ADD KEY `NV_ID` (`NV_ID`);

--
-- Indexes for table `room`
--
ALTER TABLE `room`
  ADD PRIMARY KEY (`ROOM_ID`);

--
-- Indexes for table `service`
--
ALTER TABLE `service`
  ADD PRIMARY KEY (`SERVICE_ID`);

--
-- Indexes for table `service_history`
--
ALTER TABLE `service_history`
  ADD PRIMARY KEY (`SH_ID`),
  ADD KEY `KH_ID` (`KH_ID`,`SERVICE_ID`),
  ADD KEY `SERVICE_ID` (`SERVICE_ID`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`USER_NAME`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bill`
--
ALTER TABLE `bill`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `admin`
--
ALTER TABLE `admin`
  ADD CONSTRAINT `admin_user_frk` FOREIGN KEY (`USER_NAME`) REFERENCES `user` (`USER_NAME`);

--
-- Constraints for table `bill`
--
ALTER TABLE `bill`
  ADD CONSTRAINT `bill_ibfk_1` FOREIGN KEY (`SH_ID`) REFERENCES `service_history` (`SH_ID`) ON DELETE SET NULL,
  ADD CONSTRAINT `bill_ibfk_3` FOREIGN KEY (`KH_ID`) REFERENCES `khachhang` (`KH_ID`) ON DELETE SET NULL,
  ADD CONSTRAINT `bill_ibfk_4` FOREIGN KEY (`RESERVATION_ID`) REFERENCES `reservation` (`RESERVATION_ID`) ON DELETE SET NULL;

--
-- Constraints for table `feedback`
--
ALTER TABLE `feedback`
  ADD CONSTRAINT `feedback_ibfk_1` FOREIGN KEY (`KH_ID`) REFERENCES `khachhang` (`KH_ID`);

--
-- Constraints for table `khachhang`
--
ALTER TABLE `khachhang`
  ADD CONSTRAINT `khachhang_user_frk` FOREIGN KEY (`USER_NAME`) REFERENCES `user` (`USER_NAME`);

--
-- Constraints for table `nhanvien`
--
ALTER TABLE `nhanvien`
  ADD CONSTRAINT `nhanvien_user_frk` FOREIGN KEY (`USER_NAME`) REFERENCES `user` (`USER_NAME`);

--
-- Constraints for table `reservation`
--
ALTER TABLE `reservation`
  ADD CONSTRAINT `reservation_ibfk_1` FOREIGN KEY (`ROOM_ID`) REFERENCES `room` (`ROOM_ID`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `reservation_ibfk_2` FOREIGN KEY (`KH_ID`) REFERENCES `khachhang` (`KH_ID`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `reservation_ibfk_3` FOREIGN KEY (`NV_ID`) REFERENCES `nhanvien` (`NV_ID`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `service_history`
--
ALTER TABLE `service_history`
  ADD CONSTRAINT `service_history_ibfk_1` FOREIGN KEY (`SERVICE_ID`) REFERENCES `service` (`SERVICE_ID`),
  ADD CONSTRAINT `service_history_ibfk_2` FOREIGN KEY (`KH_ID`) REFERENCES `khachhang` (`KH_ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
