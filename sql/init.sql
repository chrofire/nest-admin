/*
 Navicat Premium Data Transfer

 Source Server         : mysql
 Source Server Type    : MySQL
 Source Server Version : 80030
 Source Host           : localhost:3306
 Source Schema         : nest-admin

 Target Server Type    : MySQL
 Target Server Version : 80030
 File Encoding         : 65001

 Date: 17/09/2022 00:00:00

 RegExp
 ,\s'2022.*'
 , CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for sys_dept
-- ----------------------------
DROP TABLE IF EXISTS `sys_dept`;
CREATE TABLE `sys_dept`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `parent_id` int NULL DEFAULT NULL COMMENT '父级id',
  `name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '部门名称',
  `state` int NOT NULL COMMENT '状态 (0:启用 1:停用)',
  `order` int NULL DEFAULT NULL COMMENT '排序',
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '备注',
  `create_at` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) COMMENT '创建时间',
  `update_at` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0) COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_dept
-- ----------------------------
INSERT INTO `sys_dept` VALUES (1, NULL, '部门1', 0, NULL, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO `sys_dept` VALUES (2, 1, '部门1-1', 0, NULL, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO `sys_dept` VALUES (3, 1, '部门1-2', 0, NULL, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO `sys_dept` VALUES (4, 1, '部门1-3', 0, NULL, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO `sys_dept` VALUES (5, 2, '部门1-1-1', 0, NULL, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO `sys_dept` VALUES (6, NULL, '部门2', 0, NULL, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO `sys_dept` VALUES (7, 6, '部门2-1', 0, NULL, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- ----------------------------
-- Table structure for sys_menu
-- ----------------------------
DROP TABLE IF EXISTS `sys_menu`;
CREATE TABLE `sys_menu`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `parent_id` int NULL DEFAULT NULL COMMENT '父级id',
  `name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '菜单名称',
  `path` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '路由路径',
  `componentName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '组件',
  `permission` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '权限标识',
  `icon` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '图标',
  `type` int NOT NULL COMMENT '菜单类型 (0:目录 1:菜单 2:接口)',
  `state` int NOT NULL COMMENT '状态 (0:启用 1:停用)',
  `isCache` tinyint NULL DEFAULT NULL COMMENT '是否缓存',
  `isExternalLink` tinyint NULL DEFAULT NULL COMMENT '是否外链',
  `isShow` tinyint NULL DEFAULT NULL COMMENT '是否显示',
  `order` int NULL DEFAULT NULL COMMENT '排序',
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '备注',
  `create_at` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) COMMENT '创建时间',
  `update_at` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0) COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_menu
-- ----------------------------
INSERT INTO `sys_menu` VALUES (1, NULL, '系统管理', 'system', NULL, NULL, 'i-ep-setting', 0, 0, NULL, NULL, 1, NULL, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO `sys_menu` VALUES (2, 1, '菜单管理', 'menu', 'Menu', NULL, 'i-ep-grid', 1, 0, 1, 0, 1, NULL, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO `sys_menu` VALUES (3, 2, '添加菜单', NULL, NULL, 'system:menu:add', NULL, 2, 0, NULL, NULL, NULL, NULL, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO `sys_menu` VALUES (4, 2, '删除菜单', NULL, NULL, 'system:menu:delete', NULL, 2, 0, NULL, NULL, NULL, NULL, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO `sys_menu` VALUES (5, 2, '更新菜单', NULL, NULL, 'system:menu:update', NULL, 2, 0, NULL, NULL, NULL, NULL, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO `sys_menu` VALUES (6, 2, '查询菜单列表', NULL, NULL, 'system:menu:list', NULL, 2, 0, NULL, NULL, NULL, NULL, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO `sys_menu` VALUES (7, 1, '角色管理', 'role', 'Role', NULL, 'i-ep-postcard', 1, 0, 1, 0, 1, NULL, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO `sys_menu` VALUES (8, 7, '添加角色', NULL, NULL, 'system:role:add', NULL, 2, 0, NULL, NULL, NULL, NULL, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO `sys_menu` VALUES (9, 7, '删除角色', NULL, NULL, 'system:role:delete', NULL, 2, 0, NULL, NULL, NULL, NULL, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO `sys_menu` VALUES (10, 7, '更新角色', NULL, NULL, 'system:role:update', NULL, 2, 0, NULL, NULL, NULL, NULL, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO `sys_menu` VALUES (11, 7, '查询角色列表', NULL, NULL, 'system:role:list', NULL, 2, 0, NULL, NULL, NULL, NULL, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO `sys_menu` VALUES (12, 7, '分页查询角色列表', NULL, NULL, 'system:role:pageList', NULL, 2, 0, NULL, NULL, NULL, NULL, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO `sys_menu` VALUES (13, 1, '部门管理', 'dept', 'Dept', NULL, 'i-ep-scale-to-original', 1, 0, 1, 0, 1, NULL, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO `sys_menu` VALUES (14, 13, '添加部门', NULL, NULL, 'system:dept:add', NULL, 2, 0, NULL, NULL, NULL, NULL, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO `sys_menu` VALUES (15, 13, '删除部门', NULL, NULL, 'system:dept:delete', NULL, 2, 0, NULL, NULL, NULL, NULL, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO `sys_menu` VALUES (16, 13, '更新部门', NULL, NULL, 'system:dept:update', NULL, 2, 0, NULL, NULL, NULL, NULL, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO `sys_menu` VALUES (17, 13, '查询部门列表', NULL, NULL, 'system:dept:list', NULL, 2, 0, NULL, NULL, NULL, NULL, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO `sys_menu` VALUES (18, 1, '用户管理', 'user', 'User', NULL, 'i-ep-avatar', 1, 0, 1, 0, 1, NULL, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO `sys_menu` VALUES (19, 18, '添加用户', NULL, NULL, 'system:user:add', NULL, 2, 0, NULL, NULL, NULL, NULL, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO `sys_menu` VALUES (20, 18, '删除用户', NULL, NULL, 'system:user:delete', NULL, 2, 0, NULL, NULL, NULL, NULL, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO `sys_menu` VALUES (21, 18, '更新用户', NULL, NULL, 'system:user:update', NULL, 2, 0, NULL, NULL, NULL, NULL, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO `sys_menu` VALUES (22, 18, '查询用户列表', NULL, NULL, 'system:user:list', NULL, 2, 0, NULL, NULL, NULL, NULL, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO `sys_menu` VALUES (23, 18, '分页查询用户列表', NULL, NULL, 'system:user:pageList', NULL, 2, 0, NULL, NULL, NULL, NULL, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO `sys_menu` VALUES (24, 18, '更新当前用户密码', NULL, NULL, 'system:user:updatePassword', NULL, 2, 0, NULL, NULL, NULL, NULL, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO `sys_menu` VALUES (25, NULL, '组件管理', 'components', NULL, NULL, 'i-ep-first-aid-kit', 0, 0, NULL, NULL, 1, NULL, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO `sys_menu` VALUES (26, 25, '图片裁剪', 'cropper', 'Cropper', NULL, 'i-ep-picture', 1, 0, 1, 0, 1, NULL, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO `sys_menu` VALUES (27, 25, '图表', 'chart', 'Chart', NULL, 'i-ep-pie-chart', 1, 0, 1, 0, 1, NULL, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO `sys_menu` VALUES (28, NULL, 'Github外链', 'https://github.com/chrofire/vue3-admin', NULL, NULL, NULL, 1, 0, 0, 1, 1, NULL, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- ----------------------------
-- Table structure for sys_role
-- ----------------------------
DROP TABLE IF EXISTS `sys_role`;
CREATE TABLE `sys_role`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '角色名称',
  `state` int NOT NULL COMMENT '状态 (0:启用 1:停用)',
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_role
-- ----------------------------
INSERT INTO `sys_role` VALUES (1, '完整权限', 0, NULL);

-- ----------------------------
-- Table structure for sys_role_menu
-- ----------------------------
DROP TABLE IF EXISTS `sys_role_menu`;
CREATE TABLE `sys_role_menu`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `role_id` int NOT NULL COMMENT '角色id',
  `menu_id` int NOT NULL COMMENT '菜单id',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_role_menu
-- ----------------------------
INSERT INTO `sys_role_menu` VALUES (1, 1, 1);
INSERT INTO `sys_role_menu` VALUES (2, 1, 2);
INSERT INTO `sys_role_menu` VALUES (3, 1, 3);
INSERT INTO `sys_role_menu` VALUES (4, 1, 4);
INSERT INTO `sys_role_menu` VALUES (5, 1, 5);
INSERT INTO `sys_role_menu` VALUES (6, 1, 6);
INSERT INTO `sys_role_menu` VALUES (7, 1, 7);
INSERT INTO `sys_role_menu` VALUES (8, 1, 8);
INSERT INTO `sys_role_menu` VALUES (9, 1, 9);
INSERT INTO `sys_role_menu` VALUES (10, 1, 10);
INSERT INTO `sys_role_menu` VALUES (11, 1, 11);
INSERT INTO `sys_role_menu` VALUES (12, 1, 12);
INSERT INTO `sys_role_menu` VALUES (13, 1, 13);
INSERT INTO `sys_role_menu` VALUES (14, 1, 14);
INSERT INTO `sys_role_menu` VALUES (15, 1, 15);
INSERT INTO `sys_role_menu` VALUES (16, 1, 16);
INSERT INTO `sys_role_menu` VALUES (17, 1, 17);
INSERT INTO `sys_role_menu` VALUES (18, 1, 18);
INSERT INTO `sys_role_menu` VALUES (19, 1, 19);
INSERT INTO `sys_role_menu` VALUES (20, 1, 20);
INSERT INTO `sys_role_menu` VALUES (21, 1, 21);
INSERT INTO `sys_role_menu` VALUES (22, 1, 22);
INSERT INTO `sys_role_menu` VALUES (23, 1, 23);
INSERT INTO `sys_role_menu` VALUES (24, 1, 24);
INSERT INTO `sys_role_menu` VALUES (25, 1, 25);
INSERT INTO `sys_role_menu` VALUES (26, 1, 26);
INSERT INTO `sys_role_menu` VALUES (27, 1, 27);
INSERT INTO `sys_role_menu` VALUES (28, 1, 28);

-- ----------------------------
-- Table structure for sys_user
-- ----------------------------
DROP TABLE IF EXISTS `sys_user`;
CREATE TABLE `sys_user`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '用户名',
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '密码',
  `nickname` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '昵称',
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '邮箱',
  `phone` varchar(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '手机号',
  `dept_id` int NULL DEFAULT NULL COMMENT '部门id',
  `state` int NOT NULL COMMENT '状态 (0:启用 1:停用)',
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '备注',
  `create_at` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) COMMENT '创建时间',
  `update_at` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0) COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_user
-- ----------------------------
INSERT INTO `sys_user` VALUES (1, 'admin', '$2a$10$AuVEX9MmZVhRkQ8KsuCfn.JtE9qgOKjLfUHC5ZASYJ8RI6F8nPnX6', 'admin', NULL, NULL, 1, 0, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- ----------------------------
-- Table structure for sys_user_role
-- ----------------------------
DROP TABLE IF EXISTS `sys_user_role`;
CREATE TABLE `sys_user_role`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL COMMENT '用户id',
  `role_id` int NOT NULL COMMENT '角色id',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_user_role
-- ----------------------------
INSERT INTO `sys_user_role` VALUES (1, 1, 1);

SET FOREIGN_KEY_CHECKS = 1;
