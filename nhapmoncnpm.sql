-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 09, 2024 at 05:10 PM
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
  `COUPON_ID` varchar(20) DEFAULT NULL,
  `PAYMENT_METHOD` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `bill`
--

INSERT INTO `bill` (`ID`, `BILL_ID`, `TOTAL`, `BILL_TIME`, `BILL_STATUS`, `SH_ID`, `RESERVATION_ID`, `KH_ID`, `COUPON_ID`, `PAYMENT_METHOD`) VALUES
(1, 105, 1000, NULL, 2, NULL, 200, NULL, NULL, NULL),
(2, 111, 2500, NULL, 0, 3771894, NULL, 70203676, NULL, NULL),
(3, 112, 1200, NULL, 0, 1704307, NULL, 70203676, NULL, NULL),
(4, 113, 990, NULL, 0, NULL, 348869, 70203676, NULL, NULL),
(5, 11926730, 438, '2024-09-01 22:51:28', 2, NULL, 479210, 70479208, NULL, 'Tiền mặt'),
(6, 75500308, 700, '2024-01-09 22:51:09', 2, NULL, 481527, 70481525, NULL, 'Chuyển khoản');

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
(645780, '2024-01-09 14:26:40', 4, 'Tôi đã ở khách sạn Hust Stay Smart trong 3 ngày và rất hài lòng với trải nghiệm của mình. Phòng ốc rộng rãi, thoáng mát, và có đầy đủ tiện nghi. Nhân viên phục vụ rất nhiệt tình và chu đáo. Tôi đặc biệt ấn tượng với dịch vụ giặt ủi của khách sạn, rất nhanh chóng và chất lượng.', 70203262),
(1104010, '2024-01-09 14:27:50', 5, 'Khách sạn Hust Stay Smart là một lựa chọn tuyệt vời cho những ai đang tìm kiếm một nơi lưu trú giá cả phải chăng nhưng vẫn đảm bảo chất lượng. Phòng ốc sạch sẽ, gọn gàng, và nhân viên phục vụ rất thân thiện.', 70203262),
(3790728, '2024-01-09 14:20:48', 5, 'Tốt', 70203676),
(4955296, '2024-01-09 22:53:07', 5, 'Phòng và dịch vụ Tốt', 70481525);

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
(70203262, 'Trương Việt', '01285185', '', '', 0, 'vietproxh'),
(70203284, 'Viet', '08128158', '', '', 0, 'qangviet123'),
(70203285, 'Viet', '01295918', '', '', 0, 'qangviet1234'),
(70203676, 'Trương Quang Việt', '0347039025', '206 Đường Nguyễn Du, Quận Hoàn Kiếm, Thành phố Hà Nội', '001203021809', 0, 'abcd'),
(70234360, 'Trương Quang Việt', '0129519518', '', '', 0, 'viet123456'),
(70286743, 'Trương Quang Việt', '0345666544', '', '', 0, 'abcdef'),
(70479208, 'Nguyễn Văn Trí', '03412315169', '', '', 0, 'abcd1234'),
(70481525, 'Nguyễn Văn A', '01258158', 'số 9999, đường A', '123115', 0, 'abcd12345');

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
(200, '2024-01-10', '2024-01-13', 70479208, 509, NULL, 1, '2024-01-09 18:27:37'),
(348869, '2023-12-27', '2023-12-29', 70203676, 109, 19726325, -1, '2023-12-30 09:51:39'),
(417918, '2024-01-05', '2024-01-07', 70203676, 103, 19726325, 1, '2024-01-02 14:06:20'),
(417931, '2024-01-04', '2024-01-05', 70203676, 103, 19726325, 1, '2024-01-02 14:08:32'),
(447057, '2024-01-06', '2024-01-07', 70203676, 205, 19726325, 1, '2024-01-05 23:02:59'),
(479210, '2024-01-12', '2024-01-14', 70479208, 104, 83423641, 1, '2024-01-09 16:21:49'),
(481527, '2024-01-12', '2024-01-14', 70481525, 109, 83423641, 1, '2024-01-09 22:47:56');

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
(1, 'Bữa trưa - 1', 60, 'Đặt bữa trưa theo từng mâm (6,7 người/1 mâm) bao gồm các món:\n- Món chính: Thịt gà, thịt bò, thịt lợn, hải sản,...\n- Món phụ: Rau củ, cơm, bún, phở,...\n- Món tráng miệng: Trái cây, chè, bánh ngọt,...', 1),
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
  `STATUS` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `service_history`
--

INSERT INTO `service_history` (`SH_ID`, `KH_ID`, `SERVICE_ID`, `QUANTITY`, `DATE`, `TIME`, `TOTAL_PRICE`, `STATUS`) VALUES
(197940, 70481525, 2, 3, '2024-01-12', '23:48:00', 240, -1),
(1704307, 70203676, 3, 1, '2024-01-03', '07:48:00', 60, 1),
(2144915, 70203676, 2, 2, '2024-01-06', '00:20:00', 160, -1),
(3771894, 70203676, 2, 1, '2024-01-05', '11:16:00', 80, 1),
(7043074, 70203676, 5, 2, '2024-01-04', '09:49:00', 20, -1),
(7043366, 70203676, 2, 2, '2024-01-04', '11:50:00', 160, 1),
(7043371, 70203676, 3, 2, '2024-01-03', '00:58:00', 120, 1),
(7043418, 70203676, 1, 1, '2024-01-04', '11:16:00', 60, 1),
(8762617, 70479208, 1, 5, '2024-01-12', '16:29:00', 300, -1);

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
('abcd', '1234', 1),
('abcd1234', 'abcd1234', 1),
('abcd12345', '12345', 1),
('abcdef', '123456', 1),
('admin', 'admin', 3),
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
('qangviet123', '1', 1),
('qangviet1234', 'a', 1),
('viet123456', '123456', 1),
('vietproxh', 'a', 1);

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
  ADD KEY `COUPON_ID` (`COUPON_ID`),
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
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

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
  ADD CONSTRAINT `bill_ibfk_2` FOREIGN KEY (`COUPON_ID`) REFERENCES `coupon` (`COUPON_ID`) ON DELETE SET NULL,
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
