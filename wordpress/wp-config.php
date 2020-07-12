<?php
/**
 * WordPress基础配置文件。
 *
 * 这个文件被安装程序用于自动生成wp-config.php配置文件，
 * 您可以不使用网站，您需要手动复制这个文件，
 * 并重命名为“wp-config.php”，然后填入相关信息。
 *
 * 本文件包含以下配置选项：
 *
 * * MySQL设置
 * * 密钥
 * * 数据库表名前缀
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/zh-cn:%E7%BC%96%E8%BE%91_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL 设置 - 具体信息来自您正在使用的主机 ** //
/** WordPress数据库的名称 */
define('DB_NAME', 'bdm259364550_db');

/** MySQL数据库用户名 */
define('DB_USER', 'bdm259364550');

/** MySQL数据库密码 */
define('DB_PASSWORD', 'mm667646');

/** MySQL主机 */
define('DB_HOST', 'bdm259364550.my3w.com');

/** 创建数据表时默认的文字编码 */
define('DB_CHARSET', 'utf8');

/** 数据库整理类型。如不确定请勿更改 */
define('DB_COLLATE', '');

/**#@+
 * 身份认证密钥与盐。
 *
 * 修改为任意独一无二的字串！
 * 或者直接访问{@link https://api.wordpress.org/secret-key/1.1/salt/
 * WordPress.org密钥生成服务}
 * 任何修改都会导致所有cookies失效，所有用户将必须重新登录。
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         '*SD^?%{YXV{zVW(u0p]&K_K^^Esl{0:^4{7k5$P:LQZ?.MMYWlf?=8yl;N#rM==:');
define('SECURE_AUTH_KEY',  'd0XD}E3kM3GJ {D}4byB^2s~/>#!3?mOGd/8fPnmgYB~]$;aW9$1<A0eN/y.FMU(');
define('LOGGED_IN_KEY',    'zHzC{#R/Kf;8P=pC9]`@&;[,[IW+e1<x0e>yW;pbXAz1poT2(#OVR?vvz#}*47X`');
define('NONCE_KEY',        '8&FZVkl<*4$q>CCz U,@}c+[{x0q&>J>z446rt^cgU+oPRpnl%aLz%wr[~gTG4A_');
define('AUTH_SALT',        '(Cvtzx</8&|7|t!a*%vuL<8&b]_3b1G#Ti5RaNDEk]Q~431;hG7mFm(kqdfiNfPU');
define('SECURE_AUTH_SALT', ':T8L-S!1T~JdT+SI7:_v$OS%Zn]<`H)y]e Ab%g`-/>A5-i<7PJ||k|ui*d$@Go9');
define('LOGGED_IN_SALT',   '+C=G-IC[-)jvd}Fj{SOc__Of<(hI+e`|fL`+!%> TE{5d;;v@LEQ-c}o  ]sY!Id');
define('NONCE_SALT',       'iD|M&oV3W#dC.~)N }F|{@7e6p)-NBN_#s.Y17Q-R[zJ*|#rf+dN]`iJGCz&y9/l');

/**#@-*/

/**
 * WordPress数据表前缀。
 *
 * 如果您有在同一数据库内安装多个WordPress的需求，请为每个WordPress设置
 * 不同的数据表前缀。前缀名只能为数字、字母加下划线。
 */
$table_prefix  = 'wp_';

/**
 * 开发者专用：WordPress调试模式。
 *
 * 将这个值改为true，WordPress将显示所有用于开发的提示。
 * 强烈建议插件开发者在开发环境中启用WP_DEBUG。
 *
 * 要获取其他能用于调试的信息，请访问Codex。
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
define('WP_DEBUG', true);

/**
 * zh_CN本地化设置：启用ICP备案号显示
 *
 * 可在设置→常规中修改。
 * 如需禁用，请移除或注释掉本行。
 */
define('WP_ZH_CN_ICP_NUM', true);

/* 好了！请不要再继续编辑。请保存本文件。使用愉快！ */

/** WordPress目录的绝对路径。 */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** 设置WordPress变量和包含文件。 */
require_once(ABSPATH . 'wp-settings.php');

/** 关闭WordPress自动更新升级 */
define('AUTOMATIC_UPDATER_DISABLED', true);
