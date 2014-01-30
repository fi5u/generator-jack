<?php
/**
 * Plugin Name: Custom Content Plugin
 * Description: This plugin handles your custom content so that you can change themes without losing it.
 * Version: 0.1
 */

if ( ! function_exists( '_s_create_post_types' ) ) :
function _s_create_post_types() {
register_post_type( 'things',
    array(
        'labels' => array(
            'name' => __( 'Things' ),
            'singular_name' => __( 'Thing' )
        ),
        'public' => true,
        'has_archive' => true,
        'add_new_item' => __( 'Add Thing' ),
        'edit_item' => __('Edit Thing'),
        'new_item' => __('New Thing')
    )
);
}
add_action( 'init', '_s_create_post_types' );
endif; // _s_create_post_types